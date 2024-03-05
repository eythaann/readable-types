import { defaultOnAny } from '..';

type DEFAULT_CONFIG = {
  development: false;
  conditionWay: 'natural';
};

// @ts-ignore
type CLIENT_CONFIG = defaultOnAny<import('../../../../../rt.config').default, {}>;
export type CONFIG = Omit<DEFAULT_CONFIG, keyof CLIENT_CONFIG> & CLIENT_CONFIG;
