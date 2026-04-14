import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import knex from '../database';
import type { AuthRequest } from '../middlewares/auth.middleware';

interface UserTable {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role?: string;
}

const expiresIn: NonNullable<SignOptions['expiresIn']> = '1h';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    res.status(400).json({ error: 'Faltan datos requeridos (nombre, email, password).' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertedUsers = await knex<UserTable>('users')
      .insert({
        nombre,
        email,
        password: hashedPassword,
      })
      .returning('*');

    if (!insertedUsers || insertedUsers.length === 0) {
      res.status(500).json({ error: 'Error al crear el usuario.' });
      return;
    }

    res.status(201).json({
      message: 'Usuario registrado con exito',
      userId: insertedUsers[0]?.id,
    });
  } catch (error) {
    console.error('Error al insertar usuario con Knex:', error);
    res.status(400).json({ error: 'El email ya existe o datos invalidos.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: UserTable | undefined = await knex<UserTable>('users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Credenciales invalidas' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'secret_key';
    const token = jwt.sign({ id: user.id }, secret, { expiresIn });

    res.json({ token, nombre: user.nombre });
  } catch (error) {
    console.error('Error durante el login con Knex:', error);
    res.status(500).json({ error: 'Error en el servidor al intentar iniciar sesion.' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const { nombre, email } = req.body;

  if (!userId) {
    res.status(403).json({ error: 'Acceso denegado. ID de usuario no encontrado.' });
    return;
  }

  const updateData: { nombre?: string; email?: string } = {};

  if (nombre) {
    updateData.nombre = nombre;
  }

  if (email) {
    updateData.email = email;
  }

  if (Object.keys(updateData).length === 0) {
    res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
    return;
  }

  try {
    const rowsAffected = await knex<UserTable>('users').where({ id: userId }).update(updateData);

    if (rowsAffected === 0) {
      res.status(404).json({ error: 'Usuario no encontrado o no se pudo actualizar.' });
      return;
    }

    const updatedUser = await knex<UserTable>('users').select('id', 'nombre', 'email').where({ id: userId }).first();

    res.json({
      message: 'Datos de usuario actualizados con exito',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error al actualizar usuario con Knex:', error);
    res.status(400).json({ error: 'No se pudo actualizar el usuario. El email podria estar ya en uso o datos invalidos.' });
  }
};
