import type { Knex } from 'knex';

const superHeroesData = [
  {
    nombre: 'Superman',
    poder: 'Vuelo, Super Fuerza, Vision de calor',
    fortaleza: 'Sol Amarillo',
    resistencia: 'Extremadamente alta',
    debilidad: 'Kryptonita',
    imagen_url: 'Superman.png',
  },
  {
    nombre: 'Wonder Woman',
    poder: 'Fuerza sobrehumana, Vuelo, Lazo de la Verdad',
    fortaleza: 'Su voluntad y su entrenamiento',
    resistencia: 'Muy alta',
    debilidad: 'Armas punzantes (anteriormente)',
    imagen_url: 'Wonder-Woman.png',
  },
  {
    nombre: 'Batman',
    poder: 'Intelecto de genio, Maestria en combate',
    fortaleza: 'Su preparacion y gadgets',
    resistencia: 'Humana maxima',
    debilidad: 'Mortalidad y traumas',
    imagen_url: 'Batman.png',
  },
  {
    nombre: 'Flash (Barry Allen)',
    poder: 'Super Velocidad, Capacidad de vibrar a traves de la materia',
    fortaleza: 'La Speed Force',
    resistencia: 'Acelerada',
    debilidad: 'Frio extremo',
    imagen_url: 'Flash.png',
  },
  {
    nombre: 'Spider-Man (Peter Parker)',
    poder: 'Fuerza y agilidad proporcionales a una arana, Sentido aracnido',
    fortaleza: 'Su sentido aracnido y lanzaredes',
    resistencia: 'Alta',
    debilidad: 'Ciertos sonidos de alta frecuencia',
    imagen_url: 'Spider-Man.png',
  },
  {
    nombre: 'Iron Man (Tony Stark)',
    poder: 'Genio multimillonario, Armadura avanzada',
    fortaleza: 'Su inteligencia y recursos',
    resistencia: 'La de su armadura',
    debilidad: 'Su ego y dependencia de la armadura',
    imagen_url: 'Ironman.png',
  },
];

export async function seed(knex: Knex): Promise<void> {
  const tableName = 'catsuperheroe';

  await knex(tableName).del();
  await knex(tableName).insert(superHeroesData);

  console.log(`${superHeroesData.length} superheroes insertados en '${tableName}'.`);
}
