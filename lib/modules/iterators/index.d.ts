import { nLengthTuple } from '../arrays-and-tuples';
import { IsTrue } from '../booleans';
import { Cast } from '../generals';
import { InternalAdd } from '../numbers/math/app/addition';

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
  T,
  V,
  currentIndex = 0,
  lastResult = [],

  nextIndex = InternalAdd<currentIndex, 1>,
  result = _RT.Array.forceConcat<lastResult, [_RT.ForceExtract<(V & { index: currentIndex; tuple: T; __current: _RT.ForceExtract<T, currentIndex> }), 'return'>]>,
> = nextIndex extends _RT.ForceToString<_RT.ForceExtract<T, 'length'>> ? result : DoMap<T, V, nextIndex, result>;

export type TupleMapHKT<T extends nLengthTuple, V extends IteratorHKT.Tuple> = T extends [] ? [] : DoMap<T, V>;

/**
 *
 *
 *
 */
type DoReduce<
  T,
  V,
  acc,
  currentIndex = 0,

  nextIndex = InternalAdd<currentIndex, 1>,
  result = _RT.ForceExtract<V & { index: currentIndex; tuple: T; __current: _RT.ForceExtract<T, currentIndex>; __acc: acc }, 'return'>,
> = nextIndex extends _RT.ForceToString<_RT.ForceExtract<T, 'length'>> ? result : DoReduce<T, V, result, nextIndex>;

export type TupleReduceHKT<
  Tuple extends nLengthTuple,
  Iterator extends IteratorHKT.Tuple,
  InitialAcc = Iterator['initialAcc']
> = Tuple extends [] ? InitialAcc : DoReduce<Tuple, Iterator, InitialAcc>;

/**
 *
 *
 *
 */
type DoFind<
  T,
  V,
  currentIndex = 0,

  nextIndex = InternalAdd<currentIndex, 1>,
> = IsTrue<_RT.ForceExtract<V & { index: currentIndex; tuple: T; __current: _RT.ForceExtract<T, currentIndex> }, 'return'>> extends true
  ? _RT.ForceExtract<T, currentIndex>
  : nextIndex extends _RT.ForceToString<_RT.ForceExtract<T, 'length'>>
    ? unknown
    : DoFind<T, V, nextIndex>;

export type TupleFindHKT<
  Tuple extends nLengthTuple,
  Iterator extends IteratorHKT.Tuple,
> = Tuple extends [] ? unknown : DoFind<Tuple, Iterator>;

/**
 *
 *
 *
 */
export type UnionMapHKT<T, V extends IteratorHKT.Union, TCopy = T> = T extends infer U ? (V & { all: TCopy; current: U })['return'] : never;
