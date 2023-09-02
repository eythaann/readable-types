import { Add } from '../numbers/math';

export namespace IteratorHKT {
  export interface Union<T = unknown> {
    current: T;
    all: unknown;
    return: unknown;
  }

  export interface Tuple<T = unknown> {
    current: T;
    index: number | string;
    tuple: unknown;
    return: unknown;
    acc: unknown;
    initialAcc: unknown;
  }
}

type _TupleMapHTK<
  T extends unknown[],
  V extends IteratorHKT.Tuple,
  index extends number | string = 0,
  lastResult = [],
  result = RT_INTERNAL.Array.forceConcat<lastResult, [(V & { index: index; current: RT_INTERNAL.ForceExtract<T, index> })['return']]>,
> = Add<index, 1> extends `${T['length']}` ? result : _TupleMapHTK<T, V, Add<index, 1>, result>;

export type TupleMapHTK<T extends unknown[], V extends IteratorHKT.Tuple> = _TupleMapHTK<T, V>;

/*
interface cb extends iteratorHKT {
  return: this['index'] extends 0 ? never : `--${this['current']}--`;
}

type T0 = TupleMapHTK<['a', 'b', 'c'], cb>; */

export type TupleToUnionMapHTK<
  T extends unknown[],
  V extends IteratorHKT.Tuple,
  index extends number | string = 0,
  lastResult = never,
  result = lastResult | (V & { index: index; current: RT_INTERNAL.ForceExtract<T, index> })['return'],
> = Add<index, 1> extends `${T['length']}` ? result : TupleToUnionMapHTK<T, V, Add<index, 1>, result>;

/* type T1 = TupleToUnionMapHTK<['a', 'b', 'c'], cb>; */

export type TupleReduceHTK<
  T extends unknown[],
  V extends IteratorHKT.Tuple,
  acc = V['initialAcc'],
  index extends number | string = 0,
  result = (V & { index: index; current: RT_INTERNAL.ForceExtract<T, index>; acc: acc })['return'],
> = Add<index, 1> extends `${T['length']}` ? result : TupleReduceHTK<T, V, result, Add<index, 1>>;

/* interface cb2 extends IteratorHKT.Tuple<string> {
  initialAcc: [];
  return: [...this['acc'], this['index']];
}

type T2 = TupleReduceHTK<['a', 'b', 'c', 'd'], cb2>; */

export type UnionMapHTK<T, V extends IteratorHKT.Union, TC = T> = T extends T ? (V & { all: TC; current: T })['return'] : never;