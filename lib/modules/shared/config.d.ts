import { defaultOnAny } from '../infrastructure';

type DEFAULT_CONFIG = {
  development: true;
  conditionWay: 'natural';
};

// @ts-ignore
type CLIENT_CONFIG = defaultOnAny<typeof import('../../../../../rt.config').default, {}>;
export type CONFIG = Omit<DEFAULT_CONFIG, keyof CLIENT_CONFIG> & CLIENT_CONFIG;
