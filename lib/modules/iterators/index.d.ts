import { Cast } from '../generals';
import { Add } from '../numbers/math';

export namespace IteratorHKT {
  export interface Union<T = unknown> {
    current: T;
    all: unknown;
    return: unknown;
  }

  export interface Tuple<CurrentSupertype = unknown, AccSuperType = unknown> {
    __current: unknown;
    __acc: unknown;
    current: Cast<this['__current'], CurrentSupertype>;
    index: number | string;
    tuple: unknown[];
    acc: Cast<this['__acc'], AccSuperType>;
    return: unknown;
    initialAcc: unknown;
  }
}

/**
 *
 *
 *
 */
type DoMap<
  T extends unknown[],
  V extends IteratorHKT.Tuple,
  index extends number | string = 0,
  lastResult = [],
  result = _RT.Array.forceConcat<lastResult, [(V & { index: index; tuple: T; __current: _RT.ForceExtract<T, index> })['return']]>,
> = Add<index, 1> extends `${T['length']}` ? result : DoMap<T, V, Add<index, 1>, result>;

export type TupleMapHKT<T extends unknown[], V extends IteratorHKT.Tuple> = T extends [] ? [] : DoMap<T, V>;

/**
 *
 *
 *
 */
type DoReduce<
  T extends unknown[],
  V extends IteratorHKT.Tuple,
  acc,
  index extends number | string = 0,
  result = (V & { index: index; tuple: T; __current: _RT.ForceExtract<T, index>; __acc: acc })['return'],
> = Add<index, 1> extends `${T['length']}` ? result : DoReduce<T, V, result, Add<index, 1>>;

export type TupleReduceHKT<
  Tuple extends unknown[],
  Iterator extends IteratorHKT.Tuple,
  InitialAcc = Iterator['initialAcc']
> = Tuple extends [] ? InitialAcc : DoReduce<Tuple, Iterator, InitialAcc>;

/**
 *
 *
 *
 */
export type UnionMapHKT<T, V extends IteratorHKT.Union, TCopy = T> = T extends T ? (V & { all: TCopy; current: T })['return'] : never;

interface cb2 extends IteratorHKT.Tuple<string, unknown[]> {
  return: [...this['acc'], `++${this['current']}++`];
}

type T2 = TupleReduceHKT<['a', 'b', 'c', 'd'], cb2, []>;