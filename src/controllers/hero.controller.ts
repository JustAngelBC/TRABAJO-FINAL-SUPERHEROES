import { Request, Response } from 'express';
import knex from '../database';
import type { AuthRequest } from '../middlewares/auth.middleware';

interface CatSuperheroe {
  id: number;
  nombre: string;
  poder: string;
  fortaleza?: string;
  resistencia?: string;
  debilidad?: string;
  imagen_url: string;
}

interface Favorite {
  user_id: number;
  superheroe_id: number;
}

function getRouteId(value: string | string[] | undefined): number {
  if (Array.isArray(value)) {
    return Number.parseInt(value[0] || '', 10);
  }

  return Number.parseInt(value || '', 10);
}

export const getCatalog = async (_req: Request, res: Response): Promise<void> => {
  try {
    const heroes: CatSuperheroe[] = await knex<CatSuperheroe>('catsuperheroe').limit(12).orderBy('nombre', 'asc');
    res.json(heroes);
  } catch (error) {
    console.error('Error al obtener catalogo:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener el catalogo.' });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const { heroId } = req.body;

  if (!userId) {
    res.status(403).json({ error: 'No autorizado. Usuario no logeado.' });
    return;
  }

  if (!heroId) {
    res.status(400).json({ error: 'Se requiere el ID del heroe.' });
    return;
  }

  try {
    await knex<Favorite>('favorites').insert({
      user_id: userId,
      superheroe_id: Number(heroId),
    });

    res.json({ message: 'Heroe agregado a favoritos' });
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar o el heroe ya esta en favoritos.' });
  }
};

export const getMyFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ error: 'No autorizado. Usuario no logeado.' });
    return;
  }

  try {
    const heroes: CatSuperheroe[] = await knex('catsuperheroe as c')
      .select('c.*')
      .join('favorites as f', 'c.id', '=', 'f.superheroe_id')
      .where('f.user_id', userId);

    res.json(heroes);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener tus favoritos.' });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const heroId = getRouteId(req.params.id);

  if (!userId) {
    res.status(403).json({ error: 'No autorizado. Usuario no logeado.' });
    return;
  }

  if (Number.isNaN(heroId) || heroId <= 0) {
    res.status(400).json({ error: 'Se requiere el ID del heroe.' });
    return;
  }

  try {
    const rowsDeleted = await knex<Favorite>('favorites').where({ user_id: userId, superheroe_id: heroId }).del();

    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'El heroe no estaba en tus favoritos.' });
      return;
    }

    res.status(200).json({ message: 'Heroe eliminado de favoritos.' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar el favorito.' });
  }
};

export const createHero = async (req: Request, res: Response): Promise<void> => {
  const { nombre, poder, fortaleza, resistencia, debilidad, imagen_url } = req.body;

  if (!nombre || !poder || !imagen_url) {
    res.status(400).json({ error: 'Faltan datos obligatorios (nombre, poder, imagen_url).' });
    return;
  }

  try {
    const [newHero] = await knex<CatSuperheroe>('catsuperheroe')
      .insert({ nombre, poder, fortaleza, resistencia, debilidad, imagen_url })
      .returning('*');

    res.status(201).json({
      message: 'Superheroe creado con exito',
      hero: newHero,
    });
  } catch (error) {
    console.error('Error al crear el superheroe:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear el superheroe.' });
  }
};

export const updateHero = async (req: Request, res: Response): Promise<void> => {
  const heroId = getRouteId(req.params.id);
  const dataToUpdate = req.body;

  if (Number.isNaN(heroId)) {
    res.status(400).json({ error: 'ID de superheroe invalido.' });
    return;
  }

  try {
    const rowsAffected = await knex('catsuperheroe').where({ id: heroId }).update(dataToUpdate);

    if (rowsAffected === 0) {
      res.status(404).json({ error: `Superheroe con ID ${heroId} no encontrado.` });
      return;
    }

    const updatedHero = await knex<CatSuperheroe>('catsuperheroe').where({ id: heroId }).first();

    res.json({
      message: 'Datos del superheroe actualizados con exito',
      hero: updatedHero,
    });
  } catch (error) {
    console.error('Error al actualizar el superheroe:', error);
    res.status(400).json({ error: 'Datos invalidos para la actualizacion.' });
  }
};

export const deleteHero = async (req: Request, res: Response): Promise<void> => {
  const heroId = getRouteId(req.params.id);

  if (Number.isNaN(heroId)) {
    res.status(400).json({ error: 'ID de superheroe invalido.' });
    return;
  }

  try {
    await knex.transaction(async (trx) => {
      await trx('favorites').where({ superheroe_id: heroId }).del();

      const heroesDeleted = await trx('catsuperheroe').where({ id: heroId }).del();

      if (heroesDeleted === 0) {
        throw new Error('HeroeNotFound');
      }
    });

    res.json({
      message: `Superheroe con ID ${heroId} y sus referencias han sido eliminados con exito.`,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'HeroeNotFound') {
      res.status(404).json({ error: `Superheroe con ID ${heroId} no encontrado.` });
      return;
    }

    console.error('Error al eliminar el superheroe:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar el superheroe.' });
  }
};
