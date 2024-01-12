import { EventCollectName, EventCollection, EventScheme } from '@/models/mongo/EventSchema';
import { EventCalendar, EventResponse } from '@/models/Events';

import Mongodb from './mongoClass';
import { ObjectId } from 'mongodb';
import { UserCollectName } from '@/models/mongo/UserScheme';

class MongoEvent extends Mongodb<EventCollection> {
  public constructor() {
    super(EventScheme, EventCollectName);
  }

  public async getAll(): Promise<EventResponse[]> {
    return await this.model.find({}, {}, {}).populate('user');
  }
  public async getAllByUser(id: string): Promise<EventCalendar[]> {
    return await this.model.find({ user: id });
  }
  public async addOne(event: EventCalendar): Promise<EventCalendar> {
    const eventS = new this.model(event);
    return await eventS.save();
  }
  public async addMany(events: Array<EventCalendar>): Promise<Array<EventCalendar>> {
    return await this.model.insertMany(events);
  }
  public async editOneById(id: string, event: EventCalendar): Promise<EventResponse | null> {
    return this.model.findByIdAndUpdate(id, { $set: event }, { returnDocument: 'after' });
  }

  public async geById(id: string): Promise<EventResponse | null> {
    return await this.model.findById(id);
  }
}
export default MongoEvent;
