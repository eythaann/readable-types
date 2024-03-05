import { forceExtract } from '../internals';

import { isTrue } from '../booleans/infrastructure';

import { forceConcat } from '../arrays-and-tuples/app';
import { Call } from '../generals/HKT/app';
import { InternalAdd } from '../numbers/math/app/addition';

type DoMap<
  tuple,
  $callback,
  currentIndex = 0,
  lastResult = [],

  nextIndex = InternalAdd<currentIndex, 1>,
  result = forceConcat<lastResult, [Call<$callback, [current: forceExtract<tuple, currentIndex>]>]>,
> = nextIndex extends forceExtract<tuple, 'length'>
  ? result
  : DoMap<tuple, $callback, nextIndex, result>;

/**
 * `TupleMap` takes a tuple and a callback type and applies the callback to each item in the tuple,
 * returning a new tuple with the results.
 *
 * @param tuple - The tuple to map over.
 * @param $callback - A callback type that takes an item from the tuple and returns a transformed value.
 * @returns A new tuple with each item transformed by the callback.
 *
 * @example
 * interface $callback extends $<{ current: number }> {
 *   return: `${this['current']}`;
 * }
 * type result = TupleMap<[1, 2, 3], $callback>;  // ['1', '2', '3']
 */
export type TupleMap<tuple extends nLengthTuple | [], $callback extends $<[current: unknown]>> = tuple extends [] ? [] : DoMap<tuple, $callback>;

type DoReduce<
  tuple,
  $callback,
  acc,
  currentIndex = 0,

  nextIndex = InternalAdd<currentIndex, 1>,
  result = Call<$callback, [acc: acc, current: forceExtract<tuple, currentIndex>]>,
> = nextIndex extends forceExtract<tuple, 'length'>
  ? result
  : DoReduce<tuple, $callback, result, nextIndex>;

/**
 * `TupleReduce` takes a tuple, a callback type, and an initial accumulator value,
 * and applies the callback to each item in the tuple, accumulating a result.
 *
 * @param tuple - The tuple to reduce.
 * @param $callback - A callback type that takes an accumulator and an item from the tuple, and returns a new accumulator.
 * @param initialAcc - The initial accumulator value.
 * @returns The final accumulated value.
 *
 * @example
 * interface $callback extends $<{ acc: number; current: number }> {
 *   return: Add<this['acc'], this['current']>;
 * }
 * type result = TupleReduce<[1, 2, 3], $callback, 0>;  // 6
 */
export type TupleReduce<
  tuple extends nLengthTuple | [],
  $callback extends $<[acc: unknown, current: unknown]>,
  initialAcc,
> = tuple extends [] ? initialAcc : DoReduce<tuple, $callback, initialAcc>;

type DoFind<
  tuple,
  $callback,
  currentIndex = 0,

  nextIndex = InternalAdd<currentIndex, 1>,
> = isTrue<Call<$callback, [current: forceExtract<tuple, currentIndex>]>> extends true
  ? forceExtract<tuple, currentIndex>
  : nextIndex extends forceExtract<tuple, 'length'>
    ? never
    : DoFind<tuple, $callback, nextIndex>;

/**
 * `TupleFind` takes a tuple and a callback type, and returns the first item in the tuple
 * for which the callback returns `true`. If no such item is found, it returns `never`.
 *
 * @param tuple - The tuple to search through.
 * @param $callback - A callback type that takes an item from the tuple and returns a boolean.
 * @returns The first item for which the callback returns `true`, or `never` if no such item is found.
 *
 * @example
 * interface $callback extends $<{ current: number | string }> {
 *   return: Equals<this['current'], 'findMe'>;
 * }
 * type result = TupleFind<[1, 'findMe', 3], $callback>;  // 'findMe'
 */
export type TupleFind<
  tuple extends nLengthTuple | [],
  $callback extends $<[current: unknown]>,
> = tuple extends [] ? never : DoFind<tuple, $callback>;

/**
 * `UnionMap` takes a union type and a callback type, and applies the callback to each member of the union,
 * resulting in a new union type of the results.
 *
 * @param T - The union type to map over.
 * @param $callback - A callback type that takes a member of the union and returns a transformed value.
 * @returns A new union type with each member transformed by the callback.
 *
 * @example
 * interface $callback extends $<{ current: number }> {
 *   return: `${this['current']}`;
 * }
 * type result = UnionMap<1 | 2 | 3, $callback>;  // '1' | '2' | '3'
 */
export type UnionMap<T, $callback extends $<[current: unknown]>> = T extends infer U ? Call<$callback, [current: U]> : never;