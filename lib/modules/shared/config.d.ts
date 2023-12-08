import { defaultOnAny, modify } from '../infrastructure';

type DEFAULT_CONFIG = {
  development: true;
  conditionWay: 'natural';
};

// @ts-ignore
type CLIENT_CONFIG = defaultOnAny<typeof import('../../../../../rt.config').default, never>;

export type CONFIG = modify<DEFAULT_CONFIG, CLIENT_CONFIG>;
