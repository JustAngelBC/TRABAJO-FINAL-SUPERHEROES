import { Model } from 'objection';
import type { RelationMappings } from 'objection';

export default class Favorite extends Model {
  static tableName = 'favorites';

  user_id!: number;
  superheroe_id!: number;
  created_at!: Date;

  static get idColumn() {
    return ['user_id', 'superheroe_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'superheroe_id'],
      properties: {
        user_id: { type: 'integer' },
        superheroe_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    const User = require('./User').default;
    const CatSuperheroe = require('./CatSuperheroe').default;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorites.user_id',
          to: 'users.id',
        },
      },
      superheroe: {
        relation: Model.BelongsToOneRelation,
        modelClass: CatSuperheroe,
        join: {
          from: 'favorites.superheroe_id',
          to: 'catsuperheroe.id',
        },
      },
    };
  }
}
