/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type ResponsMongo } from "./mongo/Mongo";


export interface User {
  name: string;
  bgColorDaily: string;
  bgColorDemo: string;
}
export type UserResponse = User & ResponsMongo;
