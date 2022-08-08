import { SprintCollection } from '@/models/Sprint';
import { Model, Schema, model, models } from 'mongoose';

type Collections = SprintCollection;

class Mongodb<T extends Collections> {
  protected model: Model<T['model']>;
  public constructor(schema: Schema<T['model']>, name: T['name']) {
    this.model = models[name] || model<T['model']>(name, schema);
  }
}
export default Mongodb;
