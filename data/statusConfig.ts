import { DefaultColors } from 'tailwindcss/types/generated/colors';
type numColors = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
interface StatusConfig {
  label: string;
  color: keyof DefaultColors;
  num: numColors;
}

export const statusConfigArr: Array<StatusConfig> = [
  {
    label: 'Closed',
    color: 'green',
    num: 500,
  },
  {
    label: 'Review',
    color: 'orange',
    num: 400,
  },
  {
    label: 'accepted',
    color: 'blue',
    num: 300,
  },
  {
    label: 'inprogress',
    color: 'yellow',
    num: 300,
  },
  {
    label: 'intesting',
    color: 'red',
    num: 400,
  },
  {
    label: 'rfd',
    color: 'green',
    num: 300,
  },
  {
    label: 'onhold',
    color: 'gray',
    num: 400,
  },
  {
    label: 'done',
    color: 'green',
    num: 600,
  },
  {
    label: 'new',
    color: 'blue',
    num: 300,
  },
];
