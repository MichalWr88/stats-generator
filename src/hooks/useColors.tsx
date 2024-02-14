import resolveConfig from 'tailwindcss/resolveConfig';
import { type DefaultColors } from 'tailwindcss/types/generated/colors.js';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig?.theme?.colors as unknown as DefaultColors;

const useColors = () => {
  return colors;
};

export default useColors;
