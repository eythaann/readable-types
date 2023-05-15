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
export type IsTuple<T> = If<IsArray<T>, T extends [infer _A, ...(infer _B)] ? true : false, false>;

/**
 * Generates a tuple type with the specified length and type.
 *
 * @example
 * type A = Tuple<number, 3>;
 * //   ^? [number, number, number]
 */
export type Tuple<Type, Length extends number, _Tuple extends unknown[] = []> = _Tuple['length'] extends Length
  ? _Tuple
  : Tuple<Type, Length, [Type, ..._Tuple]>;