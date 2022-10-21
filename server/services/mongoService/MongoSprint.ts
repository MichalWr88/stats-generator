import { PaginationRequest, PaginationResponseAggregate } from '@/models/mongo/Mongo';
import { SprintCollectName, SprintCollection, SprintScheme } from '@/models/mongo/SprintScheme';
import { Issue, ResponsSprint, ResponsSprintForCSV, Sprint, LegacyIssue } from '@/models/Sprint';

import Mongodb from './mongoClass';
import { paginationResponse, queryPagination } from './queryHelpers';
class MonogSprint extends Mongodb<SprintCollection> {
  public constructor() {
    super(SprintScheme, SprintCollectName);
  }

  public async getAll(): Promise<ResponsSprint[]> {
    return await this.model.find({}, {}, { sort: { start: -1 } });
  }
  public async getAllWithoutMongoObj(): Promise<ResponsSprint[]> {
    return await this.model.find({}, { _id: 0, createdAt: 0, updatedAt: 0 }, { sort: { start: 1 } });
  }

  public async getAllPagination(pagination: PaginationRequest) {
    const query = [...queryPagination(pagination.page, pagination.pageSize)];

    const resp = await this.model.aggregate<PaginationResponseAggregate<ResponsSprint>>(query);

    return paginationResponse<ResponsSprint>(resp, pagination.page, pagination.pageSize);
  }
  public async getLastOne(): Promise<ResponsSprint | null> {
    return await this.model.findOne({}, {}, { sort: { nr: -1 } });
  }
  public async geByNrSprint(nr: number): Promise<ResponsSprint | null> {
    return await this.model.findOne({ nr });
  }
  public async geIssuesByNrSprint(nr: number): Promise<ResponsSprintForCSV | null> {
    return await this.model.findOne({ nr }, { 'issues._id': 0 });
  }
  public async getLastByLimit(): Promise<ResponsSprint | null> {
    return await this.model.findOne({});
  }
  public async addOne(sender: Sprint): Promise<Sprint> {
    const sprint = new this.model(sender);
    return await sprint.save();
  }
  public async editOne(sender: Sprint): Promise<ResponsSprint | null> {
    return this.model.findOneAndUpdate<ResponsSprint>({ nr: sender.nr }, { $set: sender }, { returnDocument: 'after' });
  }
  public async updateOne(sender: Sprint): Promise<Sprint> {
    const sprint = new this.model(sender);
    return await sprint.save();
  }
  public async updateLegacySprintsIssueArr(obj: Issue) {
    const { NR, ...iss } = obj as LegacyIssue;
    return await this.model.updateOne({ nr: NR }, { $push: { issues: iss } });
  }
}
export default MonogSprint;
