import { ConfigCollection } from '@/models/mongo/ConfigScheme';
import { EventCollection } from '@/models/mongo/EventSchema';
import { SprintCollection } from '@/models/mongo/SprintScheme';
import { UserCollection } from '@/models/mongo/UserScheme';
import { Model, Schema, model, models } from 'mongoose';

type Collections = SprintCollection | ConfigCollection | UserCollection | EventCollection;

class Mongodb<T extends Collections> {
  protected model: Model<T['model']>;
  public constructor(schema: Schema<T['model']>, name: T['name']) {
    this.model = models[name] || model<T['model']>(name, schema);
  }
}
export default Mongodb;
