import { UserCollectName, UserCollection, UserScheme } from '@/models/mongo/UserScheme';
import { User, UserResponse } from '@/models/User';

import Mongodb from './mongoClass';

class MongoUser extends Mongodb<UserCollection> {
  public constructor() {
    super(UserScheme, UserCollectName);
  }

  public async getAll(): Promise<UserResponse[]> {
    return await this.model.find({}, {}, {});
  }
  public async getAllWithoutMongoObj(): Promise<User[]> {
    return await this.model.find({}, { _id: 0, createdAt: 0, updatedAt: 0 });
  }
  public async addOne(sender: User): Promise<User> {
    const User = new this.model(sender);
    return await User.save();
  }
  public async editOneById(id: string, user: User): Promise<UserResponse | null> {
    return this.model.findByIdAndUpdate(id, { $set: user }, { returnDocument: 'after' });
  }

  public async geById(id: string): Promise<UserResponse | null> {
    return await this.model.findById(id);
  }
}
export default MongoUser;
