import { ResponsMongo } from './mongo/Mongo';

export const configType = ['epic', 'global'] as const;
export const colorSelect = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;
const numColorSelect = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

// export interface AppConfig {
//   epicConfig: Array<EpicConfig>;
//   globalConfig: Array<GlobalConfig>;
// }

export interface EpicConfig {
  type: typeof configType[0];
  name: string;
  epicsSearch: Array<string>;
  textSearch: Array<string>;
  colorPalette: typeof colorSelect;
  numPalette: typeof numColorSelect;
}
export interface GlobalConfig {
  type: typeof configType[1];
  name: string;
  value: string | number;
}

export type AppConfig = EpicConfig | GlobalConfig;
export type AppConfigResponse = AppConfig & ResponsMongo;
