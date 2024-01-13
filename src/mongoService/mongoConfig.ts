import { AppConfig, AppConfigResponse, configType, RequestGetConfigType } from 'src/models/AppConfig';
import { ConfigCollection, ConfigScheme, ConfigCollectName } from 'src/models/mongo/ConfigScheme';
import { type } from 'os';
import Mongodb from './mongoClass';

class MongoConfig extends Mongodb<ConfigCollection> {
  public constructor() {
    super(ConfigScheme, ConfigCollectName);
  }
  public async addConfig(config: AppConfig): Promise<AppConfig> {
    const configModel = new this.model(config);
    return await configModel.save();
  }
  public async editConfig(id: string, config: AppConfig): Promise<AppConfigResponse | null> {
    return await this.model.findByIdAndUpdate(id, { $set: config }, { returnDocument: 'after' });
  }
  public async removeConfig(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
  public async getAllConfigByType(type: RequestGetConfigType) {
    const body = type === 'null' ? {} : { type };
    return await this.model.find(body);
  }
  public async getAllConfigGroupedByType() {
    return await this.model.aggregate([
      {
        $group: {
          _id: type,
        },
      },
    ]);
  }
}

export default MongoConfig;
