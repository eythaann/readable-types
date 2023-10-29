import { ForceExtract } from '../app';
import { DefaultOnUnknown } from '../infrastructure';

export interface INTERNAL_RT_CONFIG {
  development: DefaultOnUnknown<ForceExtract<RT_CONFIG, 'development'>, false>;
  conditionWay: DefaultOnUnknown<ForceExtract<RT_CONFIG, 'conditionWay'>, 'natural'>;
}
