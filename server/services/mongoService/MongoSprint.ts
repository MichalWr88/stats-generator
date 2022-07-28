import {
  ResponsSprint,
  Sprint,
  SprintCollection,
  SprintCollectName,
  SprintScheme,
} from "@/models/Sprint";
import Mongodb from "./mongoClass";
class MonogSprint extends Mongodb<SprintCollection> {
  public constructor() {
    super(SprintScheme, SprintCollectName);
  }

  public async getAll(): Promise<ResponsSprint[]> {
    return await this.model.find({}, {}, { sort: { start: 1 } });
  }
  public async getLastOne(): Promise<ResponsSprint | null> {
    return await this.model.findOne({}, {}, { sort: { nr: -1 } });
  }
  public async geByNrSprint(nr: number): Promise<ResponsSprint | null> {
    return await this.model.findOne({ nr });
  }
  public async getLastByLimit(limit: number): Promise<ResponsSprint | null> {
    return await this.model.findOne({});
  }
  public async addOne(sender: Sprint): Promise<Sprint> {
    const user = new this.model(sender);
    return await user.save();
  }
  public async updateOne(sender: Sprint): Promise<Sprint> {
    const user = new this.model(sender);
    return await user.save();
  }
}
export default MonogSprint;
