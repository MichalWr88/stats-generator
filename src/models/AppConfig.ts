import * as yup from 'yup';
import { type ResponsMongo } from './mongo/Mongo';
export const configType = ['epic', 'global'];
export type RequestGetConfigType = typeof configType[number] | null;
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
type NumColorSelect = typeof numColorSelect[number];

export interface EpicConfig {
  type: 'epic';
  name: string;
  epicsSearch: Array<string>;
  textSearch: Array<string>;
  colorPalette: typeof colorSelect[number];
  numPalette: NumColorSelect;
  value?: never;
}
export interface GlobalConfig {
  type: 'global';
  name: string;
  value: string;
}

export const AppGlobalConfigAdd = yup.object().shape({
  type: yup
    .string()
    .test('configType', 'Must be exactly configType[1]', (val) => val === configType[1])
    .required(),
  name: yup.string().required(),
  value: yup.string().required(),
});
export const AppEpicConfigAdd = yup.object().shape({
  type: yup
    .string()
    .test('configType', 'Must be exactly configType[1]', (val) => val === configType[0])

    .required(),
  name: yup.string().required(),
  epicsSearch: yup.array().of(yup.string().required()),
  textSearch: yup.array().of(yup.string().required()),
  colorPalette: yup.mixed<typeof colorSelect[number]>().oneOf(colorSelect).required(),
  numPalette: yup.mixed<typeof numColorSelect[number]>().oneOf(numColorSelect).required(),
});
export const ConfigGetValidation = yup
  .string()
  .nullable()
  .test('type', 'Must be exactly configType or null', (val) => val === null || configType.some((type) => type === val));

export type AppConfig = EpicConfig | GlobalConfig;
export type AppConfigResponse = AppConfig & ResponsMongo;
export type EpicConfigResponse = EpicConfig & ResponsMongo;
