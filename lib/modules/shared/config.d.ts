import { defaultOnAny } from '../infrastructure';

type DEFAULT_CONFIG = {
  development: false;
  conditionWay: 'natural';
};

// @ts-ignore
type ConfigOnInternalProject = defaultOnAny<typeof import('../../../rt.config').default, {}>;
// @ts-ignore
type CLIENT_CONFIG = defaultOnAny<typeof import('../../../../../rt.config').default, ConfigOnInternalProject>;
export type CONFIG = Omit<DEFAULT_CONFIG, keyof CLIENT_CONFIG> & CLIENT_CONFIG;
