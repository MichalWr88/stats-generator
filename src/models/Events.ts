/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ObjectId } from 'mongoose';

import { ResponsMongo } from './mongo/Mongo';
import * as yup from 'yup';
import { User } from './User';

// export const RequestSchemaAdd: yup.ObjectSchema<RequestStatSprint> = yup.object().shape({
//   new: yup.number().min(0).required(),
//   review: yup.number().min(0).required(),
//   inProgress: yup.number().min(0).required(),
//   inTesting: yup.number().min(0).required(),
//   rfd: yup.number().min(0).required(),
//   done: yup.number().min(0).required(),
// });
// export const BugSchemaAdd: yup.ObjectSchema<BugStatSprint> = yup.object().shape({
//   closed: yup.number().min(0).required(),
//   review: yup.number().min(0).required(),
//   accepted: yup.number().min(0).required(),
//   inProgress: yup.number().min(0).required(),
//   inTesting: yup.number().min(0).required(),
//   rfd: yup.number().min(0).required(),
//   onHold: yup.number().min(0).required(),
// });

// export const IssueSchemaAdd: yup.ObjectSchema<Issue> = yup.object().shape({
//   IssueKey: yup.string().required(),
//   Issuesummary: yup.string().required(),
//   Hours: yup.string().required(),
//   IssueType: yup.string().required(),
//   EpicLink: yup.string().nullable(),
//   Username: yup.string().required(),
//   WorkDescription: yup.string().required(),
//   ParentKey: yup.string().nullable(),
//   Typeofwork: yup.string<TypeofworkList>().required().default(null),
//   EpicGroup: yup.string().nullable(),
// });
// // @ts-ignore
// export const sprintSchemaAdd: yup.ObjectSchema<Sprint> = yup.object().shape({
//   nr: yup.number().min(0).defined().required(),
//   start: yup.date().required(),
//   end: yup.date().required(),
//   plan: yup.number().min(1).required(),
//   delivered: yup.number().min(0).required(),
//   request: RequestSchemaAdd.required(),
//   bug: BugSchemaAdd.required(),
//   issues: yup
//     .array()
//     .of(IssueSchemaAdd.required())
//     .test({
//       message: "issues don't be empty",
//       test: (arr) => arr?.length !== 0,
//     })
//     .defined(),
// });
// export const sprintSchemaEdit: yup.ObjectSchema<Omit<Sprint, 'issues'>> = yup.object().shape({
//   nr: yup.number().min(0).defined().required(),
//   start: yup.date().required(),
//   end: yup.date().required(),
//   plan: yup.number().min(1).required(),
//   delivered: yup.number().min(0).required(),
//   request: RequestSchemaAdd.required(),
//   bug: BugSchemaAdd.required(),
// });

export type EventType = 'daily' | 'demo' | 'holiday';
export interface EventCalendar {
  type: EventType;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  user: string | ObjectId;
}

export type EventResponse = EventCalendar & ResponsMongo & { user: User };
