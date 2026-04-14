import { Model } from 'objection';

export default class CatSuperheroe extends Model {
  static tableName = 'catsuperheroe';

  id!: number;
  nombre!: string;
  poder!: string;
  fortaleza!: string;
  resistencia!: string;
  debilidad!: string;
  imagen_url!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nombre', 'poder', 'imagen_url'],
      properties: {
        id: { type: 'integer' },
        nombre: { type: 'string', minLength: 1, maxLength: 255 },
        poder: { type: 'string' },
        fortaleza: { type: 'string' },
        resistencia: { type: 'string' },
        debilidad: { type: 'string' },
        imagen_url: { type: 'string' },
      },
    };
  }
}
