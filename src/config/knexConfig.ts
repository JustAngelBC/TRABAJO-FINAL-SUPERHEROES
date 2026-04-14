import 'dotenv/config';
import type { Knex } from 'knex';

const knexConfig: Record<'development' | 'production', Knex.Config> = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'superheroes',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export type KnexEnvironment = keyof typeof knexConfig;

export default knexConfig;
