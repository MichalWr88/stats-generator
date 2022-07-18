import { checkMongoConnected } from "@/helpers/mongoHelpers";
import { connect, set, connection } from "mongoose";
import MonogSprint from "./MongoSprint";

// import MongoUser from "./MongoUser";
// import MongoCompany from "./MongoWork";

export const initConnectMongo = (): Promise<boolean> => {
  try {
    // if (process.env.PRODUCTION) {
    //   set("debug", true);
    // }
    console.log("initConnectMongo");
    return new Promise((resolve, reject) => {
      const mongodbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
      };
      connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/homepage?retryWrites=true&w=majority`,
        mongodbOptions
      );
      connection.once("open", () => {
        console.log("✅ Connected to DB");
        resolve(true);
      });
      connection.on("error", (error) => {
        console.log(`❌ Error on DB Connection:${error}`);
        reject(error);
        if (!checkMongoConnected()) {
          console.log(`❌ Error on DB Connection:${error.message}`);
          // connect(
          //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/homepage?retryWrites=true&w=majority`,
          //   mongodbOptions
          // );
        }
      });
    });
  } catch (err) {
    throw err;
  }
};
initConnectMongo();
export const mongoSprint = new MonogSprint();
