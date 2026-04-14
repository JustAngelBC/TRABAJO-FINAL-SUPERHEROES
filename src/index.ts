import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes';
import heroRoutes from './routes/hero.routes';
import database from './database';
import { Model } from 'objection';

const app: Application = express();
const PORT = Number(process.env.PORT || 3000);

Model.knex(database);

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(process.cwd(), 'images_superheroes', 'images')));

app.get('/', (_req, res) => {
  res.json({
    message: 'API de super heroes disponible',
    endpoints: ['/api/auth', '/api/heroes'],
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/heroes', heroRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
