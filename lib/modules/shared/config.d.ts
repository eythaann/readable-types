import { ForceExtract } from '../app';
import { defaultOnUnknown } from '../infrastructure';

export interface INTERNAL_RT_CONFIG {
  development: defaultOnUnknown<ForceExtract<RT_CONFIG, 'development'>, false>;
  conditionWay: defaultOnUnknown<ForceExtract<RT_CONFIG, 'conditionWay'>, 'natural'>;
}
