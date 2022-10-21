/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ResponsMongo } from './mongo/Mongo';
import * as yup from 'yup';

export const RequestSchemaAdd: yup.ObjectSchema<RequestStatSprint> = yup.object().shape({
  new: yup.number().min(0).required(),
  review: yup.number().min(0).required(),
  inProgress: yup.number().min(0).required(),
  inTesting: yup.number().min(0).required(),
  rfd: yup.number().min(0).required(),
  done: yup.number().min(0).required(),
});
export const BugSchemaAdd: yup.ObjectSchema<BugStatSprint> = yup.object().shape({
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
  EpicGroup: yup.string().nullable(),
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
export const sprintSchemaEdit: yup.ObjectSchema<Omit<Sprint, 'issues'>> = yup.object().shape({
  nr: yup.number().min(0).defined().required(),
  start: yup.date().required(),
  end: yup.date().required(),
  plan: yup.number().min(1).required(),
  delivered: yup.number().min(0).required(),
  request: RequestSchemaAdd.required(),
  bug: BugSchemaAdd.required(),
});

export type TypeofworkList = 'Organization' | 'Innovation' | 'Bugs' | 'Maintenance';

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
  EpicGroup: string | null | undefined;
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
  speedSix: string;
  predictability: string;
  predictabilityThree: string;
  delta: string;
}

export interface ResponsSprint extends Sprint, ResponsMongo {}
export type ResponsSprintWithoutIssues = Omit<ResponsSprint, 'issues' | '_id' | 'createdAt' | 'updatedAt'>;
export type ResponsSprintForCSV = Pick<Sprint, 'nr' | 'end' | 'start' | 'issues'>;
export type LegacyIssue = Issue & { NR: number };

export type IssueExcel = { [key in TypeofworkList]: number | string };

export interface ExcelSprint extends IssueExcel {
  speedThree: string;
  speedSix: string;
  predictability: string;
  predictabilityThree: string;
  delta: string;
  nr: string;
  plan: string;
  delivered: string;
  Rnew: number;
  Rreview: number;
  RinProgress: number;
  RinTesting: number;
  Rrfd: number;
  Rdone: number;
  Bclosed: number;
  Breview: number;
  Baccepted: number;
  BinProgress: number;
  BinTesting: number;
  Brfd: number;
  BonHold: number;
}
