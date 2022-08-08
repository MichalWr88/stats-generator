import { ResponsMongo } from "./mongo/Mongo";
import * as yup from "yup";
import { epicGroups } from "@/data/epicGroups";
import { DefaultColors } from "tailwindcss/types/generated/colors";

export const RequestSchemaAdd: yup.ObjectSchema<RequestStatSprint> = yup
  .object()
  .shape({
    new: yup.number().min(0).required(),
    review: yup.number().min(0).required(),
    inProgress: yup.number().min(0).required(),
    inTesting: yup.number().min(0).required(),
    rfd: yup.number().min(0).required(),
    done: yup.number().min(0).required(),
  });
export const BugSchemaAdd: yup.ObjectSchema<BugStatSprint> = yup
  .object()
  .shape({
    closed: yup.number().min(0).required(),
    review: yup.number().min(0).required(),
    accepted: yup.number().min(0).required(),
    inProgress: yup.number().min(0).required(),
    inTesting: yup.number().min(0).required(),
    rfd: yup.number().min(0).required(),
    onHold: yup.number().min(0).required(),
  });

export const IssueSchemaAdd: yup.ObjectSchema<Issue> = yup.object().shape({
  IssueKey: yup.string().required(),
  Issuesummary: yup.string().required(),
  Hours: yup.string().required(),
  IssueType: yup.string().required(),
  EpicLink: yup.string().nullable(),
  Username: yup.string().required(),
  WorkDescription: yup.string().required(),
  ParentKey: yup.string().nullable(),
  Typeofwork: yup.string<TypeofworkList>().required().default(null),
  EpicGroup: yup.string<EpicGroups>().nullable(),
});
// @ts-ignore
export const sprintSchemaAdd: yup.ObjectSchema<Sprint> = yup.object().shape({
  nr: yup.number().min(0).defined().required(),
  start: yup.date().required(),
  end: yup.date().required(),
  plan: yup.number().min(1).required(),
  delivered: yup.number().min(0).required(),
  request: RequestSchemaAdd.required(),
  bug: BugSchemaAdd.required(),
  issues: yup
    .array()
    .of(IssueSchemaAdd.required())
    .test({
      message: "issues don't be empty",
      test: (arr) => arr?.length !== 0,
    })
    .defined(),
});

// type SprintForm = yup.InferType<typeof IssueSchemaAdd>;

export type TypeofworkList =
  | "Organization"
  | "Innovation"
  | "Bugs"
  | "Maintenance";
export type EpicGroups = typeof epicGroups[number];
export interface ConfigMapperGroup {
  name: EpicGroups;
  epics: Array<string>;
  texts: Array<string>;
  color: string;
}

export interface Issue {
  IssueKey: string;
  Issuesummary: string;
  Hours: string | number;
  IssueType: string;
  EpicLink: string | null | undefined;
  Username: string;
  WorkDescription: string;
  ParentKey: string | null | undefined;
  Typeofwork: TypeofworkList | null | undefined;
  EpicGroup: EpicGroups | null | undefined;
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
  issues: Array<Issue>;
}
export interface SprintWithStats extends Sprint {
  speedThree: string;
  predictability: string;
  predictabilityThree: string;
}

export interface ResponsSprint extends Sprint, ResponsMongo {}
export interface ResponsSprintForCSV
  extends Pick<Sprint, "nr" | "end" | "start" | "issues"> {}

export const SprintCollectName = "sprints";

export interface SprintCollection {
  name: typeof SprintCollectName;
  model: Sprint;
}
