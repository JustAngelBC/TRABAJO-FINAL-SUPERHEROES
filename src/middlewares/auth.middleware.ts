import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  const secretEnv = process.env.JWT_SECRET;

  if (!secretEnv) {
    console.error('JWT_SECRET not defined in environment');
    res.status(500).json({ message: 'Server misconfiguration' });
    return;
  }

  const secret: Secret = secretEnv;

  try {
    const decoded = jwt.verify(token, secret) as { id?: number | string } | string;

    if (typeof decoded === 'object' && decoded && 'id' in decoded) {
      req.userId = Number(decoded.id);
      next();
      return;
    }

    res.status(401).json({ message: 'Invalid token payload' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
