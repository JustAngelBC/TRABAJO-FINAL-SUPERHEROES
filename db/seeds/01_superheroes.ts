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
  {
    nombre: 'Aquaman',
    poder: 'Telepatia marina, fuerza sobrehumana y dominio oceanico',
    fortaleza: 'Rey de Atlantis y combatiente experto',
    resistencia: 'Muy alta bajo el agua',
    debilidad: 'Deshidratacion prolongada',
    imagen_url: 'Placeholder.png',
  },
  {
    nombre: 'Green Lantern (Hal Jordan)',
    poder: 'Anillo de poder capaz de crear constructos de energia',
    fortaleza: 'Voluntad inquebrantable',
    resistencia: 'Protegido por el anillo',
    debilidad: 'Dependencia de la carga del anillo',
    imagen_url: 'Placeholder.png',
  },
  {
    nombre: 'Captain America',
    poder: 'Suero del supersoldado, liderazgo y escudo indestructible',
    fortaleza: 'Estrategia y disciplina',
    resistencia: 'Humana aumentada',
    debilidad: 'Limitaciones humanas',
    imagen_url: 'Placeholder.png',
  },
  {
    nombre: 'Black Panther',
    poder: 'Sentidos aumentados, traje de vibranium y combate avanzado',
    fortaleza: 'Tecnologia de Wakanda',
    resistencia: 'Alta con traje de vibranium',
    debilidad: 'Exposicion sin traje o hierba corazon',
    imagen_url: 'Placeholder.png',
  },
  {
    nombre: 'Thor',
    poder: 'Dios del trueno, fuerza divina y control del rayo',
    fortaleza: 'Mjolnir y herencia asgardiana',
    resistencia: 'Extremadamente alta',
    debilidad: 'Magia poderosa y orgullo',
    imagen_url: 'Placeholder.png',
  },
  {
    nombre: 'Captain Marvel',
    poder: 'Absorcion de energia, vuelo y fuerza cosmica',
    fortaleza: 'Energia fotonica',
    resistencia: 'Cosmica',
    debilidad: 'Manipulacion energetica extrema',
    imagen_url: 'Placeholder.png',
  },
];

export async function seed(knex: Knex): Promise<void> {
  const tableName = 'catsuperheroe';

  await knex(tableName).del();
  await knex(tableName).insert(superHeroesData);

  console.log(`${superHeroesData.length} superheroes insertados en '${tableName}'.`);
}
