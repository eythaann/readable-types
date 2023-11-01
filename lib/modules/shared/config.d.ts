import { forceExtract } from '../app';
import { defaultOnUnknown } from '../infrastructure';

export interface INTERNAL_RT_CONFIG {
  development: defaultOnUnknown<forceExtract<RT_CONFIG, 'development'>, false>;
  conditionWay: defaultOnUnknown<forceExtract<RT_CONFIG, 'conditionWay'>, 'natural'>;
}
