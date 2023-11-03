import { isAny } from '../any/infrastructure';
import { isType } from '../app';
import { equals } from '../comparison/infrastructure';
import { isNever } from '../never/infrastructure';
import { strToNumber } from '../numbers/infrastructure';
import { substract } from '../numbers/math/infrastructure';
import { startsWith } from '../strings/infrastructure';
import { nLengthTuple } from './domain';

export * from './domain';

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
export type isArray<T> = isType<T, any[]>;

/**
 * A utility type that checks whether a given array is empty.
 * Returns 'true' if the array is empty, and 'false' otherwise.
 *
 * @example
 * type Result1 = IsEmptyArray<[]>;
 * //   ^? true
 * type Result2 = IsEmptyArray<[1, 2, 3]>;
 * //   ^? false
 */
export type isEmptyArray<T extends unknown[]> = T extends [] ? true : false;

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
export type isTuple<T> = If<(isNever<T> | isAny<T>), {
  then: false;
  else: T extends [infer _A, ...(infer _B)] ? true : false;
}>;

/**
 * Checks if a tuple `T` includes a specific type `TypeToSearch`.
 * @example
 * type Result = tupleIncludes<[number, string, boolean], string>;
 * //   ^? true
 * type Result2 = tupleIncludes<[number, string, boolean], object>;
 * //   ^? false
 */
export type tupleIncludes<T, TypeToSearch> = T extends [infer Current, ...infer Rest]
  ? equals<Current, TypeToSearch> extends true
    ? true
    : tupleIncludes<Rest, TypeToSearch>
  : false;

/**
 * Generates a tuple type with the specified length and type.
 *
 * If you do not pass a Length will return a nLenghtTuple
 * (it works like an Array on variables declaration but differs on extends generics)
 *
 * @example
 * type A = Tuple<number, 3>;
 * //   ^? [number, number, number]
 * type B = Tuple<number>;
 * //   ^? [] | [number, ...number[]]
 */
export type Tuple<Type, Length extends number = never> = isNever<Length> extends true ? nLengthTuple<Type> : _Tuple<Type, Length>;

type _Tuple<Type, Length extends number, result extends unknown[] = []> = result['length'] extends Length
  ? result
  : [..._Tuple<Type, Length, [Type, ...result]>];

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

// @ts-ignore
export type __beta__At<T extends unknown[], I extends number> = T[startsWith<`${I}`, '-'> extends true
  ? substract<T['length'], `${I}` extends `${infer _}${infer num}` ? strToNumber<num> : never>
  : I
];

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
> = isNever<T> extends true
  ? _Result
  : T extends infer ActualKey
    ? UnionToTupleCombination<Exclude<TCopy, ActualKey>, [..._Result, ActualKey]>
    : never;

/**
 * Extracts the indexes of a tuple type `T` and returns them as a union type.
 * It excludes the extra keys present on Array objects, isolating only the actual
 * tuple indexes.
 *
 * @example
 * type Indices = getIndexes<[string, number, boolean]>;
 * //   ^? "0" | "1" | "2"
 * type Empty = getIndexes<[]>;
 * //   ^? never
 */
export type getIndexes<T> = Exclude<keyof T, keyof []>;