import { InternalAdd } from '../../numbers/math/app/addition';
import { ForceExtract } from '../app';
import { $, $ARGS, $BINDED_ARGS } from './domain';

export type Call<$Generic, Args> = $BINDED_ARGS extends keyof $Generic
  ? ForceExtract<($Generic & {
    [K in Exclude<keyof Args, keyof []> as InternalAdd<K, ForceExtract<$Generic[$BINDED_ARGS], 'length'>>]: Args[K]
  }), 'return'>
  : ForceExtract<($Generic & {
    [K in Exclude<keyof Args, keyof []>]: Args[K]
  }), 'return'>;

export type Bind<$Generic, BindedArgs> = $Generic & {
  [$BINDED_ARGS]: BindedArgs;
  [$ARGS]: cut<BindedArgs, ForceExtract<$Generic, $ARGS>>;
} & {
  [K in Exclude<keyof BindedArgs, keyof []>]: BindedArgs[K]
};

type cut<bindedArgs, args> = ForceExtract<args, 'length'> extends ForceExtract<bindedArgs, 'length'>
  ? args
  : args extends [infer _, ...infer Rest] ? cut<bindedArgs, Rest> : [];

interface $example extends $<[number, string, number, string]> {
  return: `${this['0']}-${this['1']}++++${this['2']}-${this['3']}`;
}

type $bindedExample = Bind<$example, [123, 'worth']>;

//type $bindedExample2 = Bind<$bindedExample, [555, 'GG']>;

type result = Call<$bindedExample, ['123']>;
