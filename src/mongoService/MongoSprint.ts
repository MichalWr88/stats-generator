import {
  type ResponsSprint,
  type ResponsSprintForCSV,
  type Sprint,
  type LegacyIssue,
  type Issue,
} from '@/models/Sprint';
import { type PaginationRequest, type PaginationResponseAggregate } from '@/models/mongo/Mongo';
import { type SprintCollection, SprintScheme, SprintCollectName } from '@/models/mongo/SprintScheme';
import Mongodb from './mongoClass';
import { paginationResponse, queryPagination } from './queryHelpers';
class MongoSprint extends Mongodb<SprintCollection> {
  public constructor() {
    super(SprintScheme, SprintCollectName);
  }

  public async getAll(): Promise<ResponsSprint[]> {
    return this.model.find({}, {}, { sort: { start: -1 } });
  }
  public async getAllWithoutMongoObj(): Promise<ResponsSprint[]> {
    return this.model.find({}, { _id: 0, createdAt: 0, updatedAt: 0 }, { sort: { start: 1 }, lean: true });
  }
  public async getOneByNSprintWithoutMongoObj(nr: number): Promise<ResponsSprint> {
    return this.model.findOne({ nr }, { _id: 0, createdAt: 0, updatedAt: 0 }, { sort: { start: 1 }, lean: true });
  }

  public async getAllPagination(pagination: PaginationRequest) {
    const query = [...queryPagination(pagination.page, pagination.pageSize)];

    const resp = await this.model.aggregate<PaginationResponseAggregate<ResponsSprint>>(query);

    return paginationResponse<ResponsSprint>(resp, pagination.page, pagination.pageSize);
  }
  public async getLastOne(): Promise<ResponsSprint | null> {
    return this.model.findOne({}, {}, { sort: { nr: -1 } });
  }
  public async geByNrSprint(nr: number): Promise<ResponsSprint | null> {
    return this.model.findOne({ nr });
  }
  public async geIssuesByNrSprint(nr: number): Promise<ResponsSprintForCSV | null> {
    return this.model.findOne({ nr }, { 'issues._id': 0 });
  }
  public async getLastByLimit(): Promise<ResponsSprint | null> {
    return this.model.findOne({});
  }
  public async addOne(sender: Sprint): Promise<Sprint> {
    const sprint = new this.model(sender);
    return sprint.save();
  }
  public async editOne(sender: Sprint): Promise<ResponsSprint | null> {
    return this.model.findOneAndUpdate<ResponsSprint>({ nr: sender.nr }, { $set: sender }, { returnDocument: 'after' });
  }
  public async updateOne(sender: Sprint): Promise<Sprint> {
    const sprint = new this.model(sender);
    return sprint.save();
  }
  public async updateLegacySprintsIssueArr(obj: Issue) {
    const { NR, ...iss } = obj as LegacyIssue;
    return this.model.updateOne({ nr: NR }, { $push: { issues: iss } });
  }
}
export default MongoSprint;
