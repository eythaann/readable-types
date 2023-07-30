import { IsAny } from '../any';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';

/**
 * Evaluates if the specified type is an array.
 *
 * @example
 * type A = IsArray<number[]>;
 * //   ^? true
 * type B = IsArray<string>;
 * //   ^? false
 * type C = IsArray<never>;
 * //   ^? false
 */
export type IsArray<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, T extends any[] ? true : false>;

/**
 * A utility type that checks whether a given array is empty.
 * Returns 'true' if the array is empty, and 'false' otherwise.
 *
 * @example
 * ```
 * type Result1 = IsEmptyArray<[]>; //   ^? true
 * type Result2 = IsEmptyArray<[1, 2, 3]>; //   ^? false
 * ```
 */
export type IsEmptyArray<T extends unknown[]> = T extends [] ? true : false;

/**
 * Evaluates if the specified type is a tuple.
 *
 * @example
 * type A = IsTuple<[number, string]>;
 * //   ^? true
 * type B = IsTuple<number[]>;
 * //   ^? false
 * type C = IsTuple<never>;
 * //   ^? false
 */
export type IsTuple<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, T extends [infer _A, ...(infer _B)] ? true : false> ;

/**
 * Generates a tuple type with the specified length and type.
 *
 * @example
 * type A = Tuple<number, 3>;
 * //   ^? [number, number, number]
 */
export type Tuple<Type, Length extends number | string, _Tuple extends unknown[] = []> = `${_Tuple['length']}` extends `${Length}`
  ? _Tuple
  : [...Tuple<Type, Length, [Type, ..._Tuple]>];

/**
 * `Shift` takes a tuple and returns a new tuple excluding the first element from the original tuple.
 *
 * @example
 * type A = Shift<[1, 2, 3]>;
 * //   ^? [2, 3]
 */
export type Shift<T extends unknown[]> = T extends [infer _, ...infer Result] ? Result : [];

/**
 * `Pop` takes a tuple and returns a new tuple excluding the last element from the original tuple.
 *
 * @example
 * type A = Pop<[1, 2, 3]>;
 * //   ^? [1, 2]
 */
export type Pop<T extends unknown[]> = T extends [...infer Result, infer _] ? Result : [];

/**
 * `ShiftRecursive` recursively generates all possible subsets of a tuple by successively excluding
 * the first element in each iteration until the length of the tuple is equal to a specified minimum length.
 *
 * @example
 * type A = ShiftRecursive<[1, 2, 3]>;
 * //   ^? [], [2, 3], [3]
 */
export type ShiftRecursive<
  T extends unknown[],
  minLength extends number = 0,
  Result = minLength extends 0 ? [] : never,
  Shifted extends unknown[] = Shift<T>
> = T['length'] extends minLength
  ? Result
  : ShiftRecursive<Shifted, minLength, Result | Shifted>;

/**
 * `PopRecursive` recursively generates all possible subsets of a tuple by successively excluding
 * the last element in each iteration until the length of the tuple is zero.
 *
 * @example
 * type A = PopRecursive<[1, 2, 3]>;
 * //   ^? [1, 2] | [1] | []
 */
export type PopRecursive<
  T extends unknown[],
  minLength extends number = 0,
  Result = minLength extends 0 ? [] : never,
  Poped extends unknown[] = Pop<T>
> = T['length'] extends 0
  ? Result
  : PopRecursive<Poped, minLength, Result | Poped>;

/**
 * `UnionToTupleCombination` converts a union into a combinations of tuples.
 *
 * @example
 * type A = UnionToTupleCombination<'a' | 'b' | 'c'>;
 * //   ^? ['a', 'b'] | ['b', 'a']
 */
export type UnionToTupleCombination<
  T,
  _Result extends unknown[] = [],

  TCopy = T,
> = IsNever<T> extends true
  ? _Result
  : T extends infer ActualKey
    ? UnionToTupleCombination<Exclude<TCopy, ActualKey>, [..._Result, ActualKey]>
    : never;