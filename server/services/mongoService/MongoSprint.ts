

import { ResponsSprint, Sprint, SprintCollection, SprintCollectName, SprintScheme } from '@/models/Sprint';
import Mongodb from './mongoClass';
class MonogSprint extends Mongodb<SprintCollection> {
  public constructor() {
    super(SprintScheme, SprintCollectName);
  }

  public async getAll(): Promise<ResponsSprint[]> {
    return await this.model.find({});
  }
  public async getLastOne(): Promise<ResponsSprint | null> {
    return await this.model.findOne({ lang });
  }
  public async getLastByLimit(limit:number): Promise<ResponsSprint | null> {
    return await this.model.findOne({ lang });
  }
  public async addOne(sender: Sprint): Promise<Sprint> {
    const user = new this.model(sender);
    return await user.save()
  }
  public async updateOne(sender: User): Promise<User> {
    const user = new this.model(sender);
    return await user.save()
  }

}
export default MonogSprint;
