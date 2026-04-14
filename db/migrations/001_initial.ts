import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('favorites');
  await knex.schema.dropTableIfExists('catsuperheroe');
  await knex.schema.dropTableIfExists('users');

  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nombre', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).defaultTo('user');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('catsuperheroe', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nombre', 100).notNullable().unique();
    table.string('poder', 255).notNullable();
    table.string('fortaleza', 255);
    table.string('resistencia', 255);
    table.string('debilidad', 255);
    table.string('imagen_url', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('favorites', (table: Knex.TableBuilder) => {
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('superheroe_id').unsigned().notNullable().references('id').inTable('catsuperheroe').onDelete('CASCADE');
    table.primary(['user_id', 'superheroe_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('favorites');
  await knex.schema.dropTableIfExists('catsuperheroe');
  await knex.schema.dropTableIfExists('users');
}
