import { ForceExtract } from '../app';
//import { $, $ARGS, $BINDED_ARGS } from './domain';

export type Call<$Generic, Args, /* _Args = [...$Generic[$BINDED_ARGS], ...Args] */> = ForceExtract<($Generic & {
  [K in Exclude<keyof Args, keyof []>]: Args[K]
}), 'return'>;

// TODO finish this feature
/* export type Bind<$Generic, BindedArgs> = $Generic & {
  [$BINDED_ARGS]: [...$Generic[$BINDED_ARGS], ...BindedArgs];
  [$ARGS]: cut<BindedArgs, ForceExtract<$Generic, $ARGS>>;
} & {
  [K in Exclude<keyof BindedArgs, keyof []>]: BindedArgs[K]
};

type cut<bindedArgs, args> = args['length'] extends bindedArgs['length']
  ? args
  : args extends [infer _, ...infer Rest] ? cut<bindedArgs, Rest> : [];

interface $example extends $<[number, string, number, string]> {
  return: `${this['0']}-${this['1']}++++${this['2']}-${this['3']}`;
}

type $bindedExample = Bind<$example, [123, 'worth']>;

//type $bindedExample2 = Bind<$bindedExample, [555, 'GG']>;

type result = Call<$bindedExample, [156, '123']>;

type t0 = ($bindedExample & { 2: 156 })['return'];

type t1 = $bindedExample[$BINDED_ARGS]; */