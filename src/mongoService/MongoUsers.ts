

import { type UserResponse, type User } from '@/models/User';
import { type UserCollection, UserScheme, UserCollectName } from '@/models/mongo/UserScheme';
import Mongodb from './mongoClass';

class MongoUser extends Mongodb<UserCollection> {
  public constructor() {
    super(UserScheme, UserCollectName);
  }

  public async getAll(): Promise<UserResponse[]> {
    return this.model.find({}, {}, {});
  }
  public async getAllWithoutMongoObj(): Promise<User[]> {
    return this.model.find({}, { _id: 0, createdAt: 0, updatedAt: 0 });
  }
  public async addOne(sender: User): Promise<User> {
    const User = new this.model(sender);
    return User.save();
  }
  public async editOneById(id: string, user: User): Promise<UserResponse | null> {
    return this.model.findByIdAndUpdate(id, { $set: user }, { returnDocument: 'after' });
  }

  public async geById(id: string): Promise<UserResponse | null> {
    return this.model.findById(id);
  }
}
export default MongoUser;
