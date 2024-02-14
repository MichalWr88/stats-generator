import { type EventResponse, type EventCalendar } from "@/models/Events";
import { type EventCollection, EventScheme, EventCollectName } from "@/models/mongo/EventSchema";
import Mongodb from "./mongoClass";


class MongoEvent extends Mongodb<EventCollection> {
  public constructor() {
    super(EventScheme, EventCollectName);
  }

  public async getAll(): Promise<EventResponse[]> {
    return this.model.find({}, {}, {}).populate('user');
  }
  public async getAllByUser(id: string): Promise<EventCalendar[]> {
    return this.model.find({ user: id });
  }
  public async addOne(event: EventCalendar): Promise<EventCalendar> {
    const eventS = new this.model(event);
    return eventS.save();
  }
  public async addMany(events: Array<EventCalendar>): Promise<Array<EventCalendar>> {
    return this.model.insertMany(events);
  }
  public async editOneById(id: string, event: EventCalendar): Promise<EventResponse | null> {
    return this.model.findByIdAndUpdate(id, { $set: event }, { returnDocument: 'after' });
  }

  public async geById(id: string): Promise<EventResponse | null> {
    return this.model.findById(id);
  }
}
export default MongoEvent;
