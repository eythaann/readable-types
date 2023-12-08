import { RT_CONFIG_SCHEME } from './lib';

export default {
  development: true,
  conditionWay: 'natural',
  testing: {
    include: ['.*(\.(spec|test)(-types)?\.ts)$'],
    exclude: ['.*node_modules.*'],
  },
} as const satisfies RT_CONFIG_SCHEME;