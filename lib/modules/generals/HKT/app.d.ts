import { modifyInterface } from '../../infrastructure';
import { InternalAdd } from '../../numbers/math/app/addition';
import { forceExtract } from '../app';
import { $ArgumentTypes, $BINDED_ARGS } from './domain';

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
  [$ArgumentTypes]: cut<BindedArgs, forceExtract<$Generic, $ArgumentTypes>>;
} & {
  [K in Exclude<keyof BindedArgs, keyof []>]: BindedArgs[K]
};