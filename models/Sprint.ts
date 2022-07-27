import { Model, Schema } from "mongoose";
import { ResponsMongo } from "./Mongo";

export type TypeofworkList =
  | "Organization"
  | "Innovation"
  | "Bugs"
  | "Maintenance";
export type EpicGroup =
  | "NLW"
  | "CIC"
  | "CBL"
  | "RCP"
  | "COC"
  | "API Facade"
  | "Company Monitor"
  | "CRM"
  | "Sherlock"
  | "Company Verification";
export interface Issue {
  IssueKey: string;
  Issuesummary: string;
  Hours: string;
  IssueType: string;
  EpicLink: string;
  Username: string;
  WorkDescription: string;
  ParentKey: string;
  Typeofwork: TypeofworkList;
  EpicGroup: EpicGroup | null;
}
export interface BugStatSprint {
  closed: number;
  review: number;
  accepted: number;
  inProgress: number;
  inTesting: number;
  rfd: number;
  onHold: number;
}
export interface RequestStatSprint {
  new: number;
  review: number;
  inProgress: number;
  inTesting: number;
  rfd: number;
  done: number;
}

export interface Sprint {
  nr: number;
  start: Date;
  end: Date;
  plan: number;
  delivered: number;
  request: RequestStatSprint;
  bug: BugStatSprint;
}
export interface SprintWithStats extends Sprint {
  speedThree: string;
  predictability: string;
  predictabilityThree: string;
}

export interface ResponsSprint extends Sprint, ResponsMongo {}

export const SprintCollectName = "sprints";

export interface SprintCollection {
  name: typeof SprintCollectName;
  model: Sprint;
}
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
