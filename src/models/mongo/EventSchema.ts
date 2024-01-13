import { Model, Schema } from 'mongoose';
import { EventCalendar } from '../Events';
import { UserCollectName, UserScheme } from './UserScheme';
import { ObjectId } from 'mongodb';

export const EventScheme = new Schema<EventCalendar, Model<EventCalendar>>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: UserCollectName,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const EventCollectName = 'events';

export interface EventCollection {
  name: typeof EventCollectName;
  model: EventCalendar;
}
