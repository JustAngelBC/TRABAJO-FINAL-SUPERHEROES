import knex from 'knex';
import type { Knex } from 'knex';
import knexConfig from './config/knexConfig';

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config: Knex.Config | undefined = knexConfig[environment];

if (!config) {
  throw new Error(`La configuracion de Knex para el entorno '${environment}' no fue encontrada.`);
}

const database = knex(config);

export default database;
