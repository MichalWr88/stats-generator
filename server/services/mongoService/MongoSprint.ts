import { PaginationRequest } from "@/models/mongo/Mongo";
import { PaginationResponseAggregate } from "@/models/mongo/Mongo";
import { LegacyIssue, SprintScheme } from "@/models/mongo/SprintSchema";
import {
  Issue,
  ResponsSprint,
  Sprint,
  SprintCollection,
  SprintCollectName,
} from "@/models/Sprint";
import Mongodb from "./mongoClass";
import { paginationResponse, queryPagination } from "./queryHelpers";
class MonogSprint extends Mongodb<SprintCollection> {
  public constructor() {
    super(SprintScheme, SprintCollectName);
  }

  public async getAll(): Promise<ResponsSprint[]> {
    return await this.model.find({}, {}, { sort: { start: -1 } });
  }

  public async getAllPagination(pagination: PaginationRequest) {
    const query = [...queryPagination(pagination.page, pagination.pageSize)];

    const resp = await this.model.aggregate<
      PaginationResponseAggregate<ResponsSprint>
    >(query);

    return paginationResponse<ResponsSprint>(
      resp,
      pagination.page,
      pagination.pageSize
    );
  }
  public async getLastOne(): Promise<ResponsSprint | null> {
    return await this.model.findOne({}, {}, { sort: { nr: -1 } });
  }
  public async geByNrSprint(nr: number): Promise<ResponsSprint | null> {
    return await this.model.findOne({ nr });
  }
  public async getLastByLimit(limit: number): Promise<ResponsSprint | null> {
    return await this.model.findOne({});
  }
  public async addOne(sender: Sprint): Promise<Sprint> {
    const sprint = new this.model(sender);
    return await sprint.save();
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
