import { Schema } from 'mongoose';
import { type AppConfig } from '../AppConfig';


export const ConfigScheme = new Schema<AppConfig>(
  {
    type: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      unique: true,
    },
    epicsSearch: {
      type: [String],
    },
    textSearch: {
      type: [String],
    },
    colorPalette: {
      type: String,
    },
    numPalette: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const ConfigCollectName = 'config';

export interface ConfigCollection {
  name: typeof ConfigCollectName;
  model: AppConfig;
}

// linkedin url
// instrukcja markdown
//
