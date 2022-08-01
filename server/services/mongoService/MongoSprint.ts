import { PaginationRequest } from "@/models/mongo/Mongo";
import { PaginationResponseAggregate } from "@/models/mongo/Mongo";
import { SprintScheme } from "@/models/mongo/SprintSchema";
import {
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
    console.log(query)
    const resp = await this.model.aggregate<
      PaginationResponseAggregate<ResponsSprint>
    >(query);
    console.log(resp)
    return paginationResponse<ResponsSprint>(resp, pagination.page, pagination.pageSize);
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
    const user = new this.model(sender);
    return await user.save();
  }
  public async updateOne(sender: Sprint): Promise<Sprint> {
    const user = new this.model(sender);
    return await user.save();
  }
}
export default MonogSprint;
