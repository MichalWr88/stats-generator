import { ConfigCollection } from '@/models/mongo/ConfigScheme';
import { SprintCollection } from '@/models/mongo/SprintScheme';
import { Model, Schema, model, models } from 'mongoose';

type Collections = SprintCollection | ConfigCollection;

class Mongodb<T extends Collections> {
  protected model: Model<T['model']>;
  public constructor(schema: Schema<T['model']>, name: T['name']) {
    this.model = models[name] || model<T['model']>(name, schema);
  }
}
export default Mongodb;
