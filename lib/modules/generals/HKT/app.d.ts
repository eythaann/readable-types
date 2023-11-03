import { InternalAdd } from '../../numbers/math/app/addition';
import { forceExtract } from '../app';
import { $ARGS, $BINDED_ARGS } from './domain';

export type Call<$Generic, Args> = $BINDED_ARGS extends keyof $Generic
  ? forceExtract<($Generic & {
    [K in Exclude<keyof Args, keyof []> as InternalAdd<K, forceExtract<$Generic[$BINDED_ARGS], 'length'>>]: Args[K]
  }), 'return'>
  : forceExtract<($Generic & {
    [K in Exclude<keyof Args, keyof []>]: Args[K]
  }), 'return'>;

export type Bind<$Generic, BindedArgs> = $Generic & {
  [$BINDED_ARGS]: BindedArgs;
  [$ARGS]: cut<BindedArgs, forceExtract<$Generic, $ARGS>>;
} & {
  [K in Exclude<keyof BindedArgs, keyof []>]: BindedArgs[K]
};

type cut<bindedArgs, args> = forceExtract<args, 'length'> extends forceExtract<bindedArgs, 'length'>
  ? args
  : args extends [infer _, ...infer Rest] ? cut<bindedArgs, Rest> : [];
