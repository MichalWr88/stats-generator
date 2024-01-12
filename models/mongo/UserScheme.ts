import { Model, Schema } from 'mongoose';
import { User } from '../User';

export const UserScheme = new Schema<User, Model<User>>(
  {
    name: {
      type: String,
    },
    bgColorDaily: {
      type: String,
    },
    bgColorDemo: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserCollectName = 'users';

export interface UserCollection {
  name: typeof UserCollectName;
  model: User;
}
