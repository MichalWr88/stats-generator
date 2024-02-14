import { type Model, type Schema, models, model } from "mongoose";
import { type ConfigCollection } from "@/models/mongo/ConfigScheme";
import { type EventCollection } from "@/models/mongo/EventSchema";
import { type SprintCollection } from "@/models/mongo/SprintScheme";
import { type UserCollection } from "@/models/mongo/UserScheme";

type Collections = SprintCollection | ConfigCollection | UserCollection | EventCollection;

class Mongodb<T extends Collections> {
  protected model: Model<T['model']>;
  public constructor(schema: Schema<T['model']>, name: T['name']) {
    this.model = models[name] as Model<T['model']> ?? model<T['model']>(name, schema);
  }
}
export default Mongodb;
