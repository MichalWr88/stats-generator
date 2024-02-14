import { type } from 'os';
import { type AppConfig, type AppConfigResponse, type RequestGetConfigType } from '@/models/AppConfig';
import { type ConfigCollection, ConfigScheme, ConfigCollectName } from '@/models/mongo/ConfigScheme';
import Mongodb from './mongoClass';


class MongoConfig extends Mongodb<ConfigCollection> {
  public constructor() {
    super(ConfigScheme, ConfigCollectName);
  }
  public async addConfig(config: AppConfig): Promise<AppConfig> {
    const configModel = new this.model(config);
    return configModel.save();
  }
  public async editConfig(id: string, config: AppConfig): Promise<AppConfigResponse | null> {
    return this.model.findByIdAndUpdate(id, { $set: config }, { returnDocument: 'after' });
  }
  public async removeConfig(id: string) {
    return this.model.findByIdAndDelete(id);
  }
  public async getAllConfigByType(type: RequestGetConfigType) {
    const body = type ? { type } : {};
    return this.model.find(body);
  }
  public async getAllConfigGroupedByType() {
    return this.model.aggregate([
      {
        $group: {
          _id: type,
        },
      },
    ]);
  }
}

export default MongoConfig;
