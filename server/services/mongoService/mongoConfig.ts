import { AppConfig, AppConfigResponse, configType } from '@/models/AppConfig';
import { ConfigCollection, ConfigScheme, ConfigCollectName } from '@/models/mongo/ConfigScheme';
import { type } from 'os';
import Mongodb from './mongoClass';

class MonogConfig extends Mongodb<ConfigCollection> {
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
  public async getAllConfigByType(type: typeof configType) {
    return await this.model.find({ type });
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

export default MonogConfig;
