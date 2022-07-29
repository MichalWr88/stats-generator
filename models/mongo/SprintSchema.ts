import { Model, Schema } from "mongoose";
import { BugStatSprint, Issue, RequestStatSprint, Sprint } from "../Sprint";
export const IssueStatScheme = new Schema<Issue, Model<Issue>>({
  IssueKey: {
    type: String,
  },
  Issuesummary: {
    type: String,
  },
  Hours: {
    type: String,
  },
  IssueType: {
    type: String,
  },
  EpicLink: {
    type: String,
  },
  Username: {
    type: String,
  },
  WorkDescription: {
    type: String,
  },
  ParentKey: {
    type: String,
  },
  Typeofwork: {
    type: String,
  },
  EpicGroup: {
    type: String,
  },
});
export const BugStatScheme = new Schema<BugStatSprint, Model<BugStatSprint>>({
  closed: {
    type: Number,
  },
  review: {
    type: Number,
  },
  accepted: {
    type: Number,
  },
  inProgress: {
    type: Number,
  },
  inTesting: {
    type: Number,
  },
  rfd: {
    type: Number,
  },
  onHold: {
    type: Number,
  },
});
export const RequestStatScheme = new Schema<
  RequestStatSprint,
  Model<RequestStatSprint>
>({
  new: {
    type: Number,
  },
  review: {
    type: Number,
  },
  inProgress: {
    type: Number,
  },
  inTesting: {
    type: Number,
  },
  rfd: {
    type: Number,
  },
  done: {
    type: Number,
  },
});

export const SprintScheme = new Schema<Sprint>(
  {
    nr: {
      type: Number,
      unique: true,
    },
    start: {
      type: Date,
      unique: true,
    },
    end: {
      type: Date,
      unique: true,
    },
    plan: {
      type: Number,
    },
    delivered: {
      type: Number,
    },
    request: {
      type: RequestStatScheme,
    },
    bug: {
      type: BugStatScheme,
    },
    issues: {
      type: [IssueStatScheme],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
