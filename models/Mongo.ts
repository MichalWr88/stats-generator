import { ObjectId } from "mongoose";

export interface ResponsMongo {
    _id: ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}