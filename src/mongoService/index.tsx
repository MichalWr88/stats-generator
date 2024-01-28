import { type MongoError } from 'mongodb';
import { type ConnectOptions, connect, connection } from 'mongoose';
import { checkMongoConnected } from '@/utils/mongoHelpers';
import MongoEvent from './MongoEvents';
import MongoSprint from './MongoSprint';
import MongoUser from './MongoUsers';
import MongoConfig from './mongoConfig';

const mongodbOptions: ConnectOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // strictQuery: true
  // user: process.env.MONGO_USER,
  // pass: process.env.MONGO_PASSWORD,
};

export const initConnectMongo = async () => {
  try {
    console.log('initConnectMongo');
    if (
      !process.env.MONGO_USER ||
      !process.env.MONGO_PASSWORD ||
      !process.env.MONGO_CLUSTER ||
      !process.env.MONGO_DB_NAME
    ) {
      const errorMessage = 'MONGO_USER or MONGO_PASSWORD or MONGO_CLUSTER or MONGO_DB_NAME not set';
      console.log('❌ ' + errorMessage);
      return new Error(errorMessage);
    }
    connection.once('open', () => {
      console.log(`✅ Connected to DB  ${process.env.MONGO_DB_NAME ?? 'unknown'}`);
    });
    connection.on('error', (error: string) => {
      console.log(`❌ Error on DB Connection:${error}`);
      if (!checkMongoConnected()) {
        const err = error as unknown as MongoError;
        console.log(`❌ Error on DB Connection:${err.message}`);
      }
    });
    return await connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      mongodbOptions
    );
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};
await initConnectMongo();
export const mongoSprint = new MongoSprint();
export const mongoConfig = new MongoConfig();
export const mongoUser = new MongoUser();
export const mongoEvent = new MongoEvent();
