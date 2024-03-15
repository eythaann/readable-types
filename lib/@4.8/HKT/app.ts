import { modifyInterface } from '../../modules';

import { forceExtract } from '../../modules/generals/app';
import { InternalAdd } from '../math/app/addition';

import { $ARGUMENTS, $BINDED_ARGS } from './domain';

export type Call<$Generic, Args> = $BINDED_ARGS extends keyof $Generic
  //@ts-ignore
  ? forceExtract<modifyInterface<$Generic, {
    [K in Exclude<keyof Args, keyof []> as InternalAdd<K, forceExtract<$Generic[$BINDED_ARGS], 'length'>>]: Args[K]
  }>, 'return'>

  //@ts-ignore
  : forceExtract<(modifyInterface<$Generic, {
    [K in Exclude<keyof Args, keyof []>]: Args[K]
  }>), 'return'>;

type cut<bindedArgs, args> = forceExtract<args, 'length'> extends forceExtract<bindedArgs, 'length'>
  ? args
  : args extends [infer _, ...infer Rest] ? cut<bindedArgs, Rest> : [];

export type Bind<$Generic, BindedArgs> = $Generic & {
  [$BINDED_ARGS]: BindedArgs;
  [$ARGUMENTS]: cut<BindedArgs, forceExtract<$Generic, $ARGUMENTS>>;
} & {
  [K in Exclude<keyof BindedArgs, keyof []>]: BindedArgs[K]
};