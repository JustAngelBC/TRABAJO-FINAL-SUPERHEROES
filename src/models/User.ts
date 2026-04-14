import { Model } from 'objection';
import type { RelationMappings } from 'objection';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static tableName = 'users';

  id!: number;
  nombre!: string;
  email!: string;
  password!: string;
  role!: string;
  created_at!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nombre', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        nombre: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
      },
    };
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static get relationMappings(): RelationMappings {
    const Favorite = require('./Favorite').default;
    return {
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: 'users.id',
          to: 'favorites.user_id',
        },
      },
    };
  }
}
