import { AnyFunction, AnyObject } from '../../constants';
import { IsAny } from '../any';
import { IsEmptyArray, IsTuple } from '../arrays';
import { Not, Or } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { IsNever } from '../never';
import { IsUnknown } from '../unknow';

/**
 * Return true if type is of type object array or function
 * if you are searching for only object use IsStrictObject instead.
*/
export type IsObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : T extends AnyObject ? true
      : false;

/**
 * Return true if type is of type object ignoring arrays.
*/
export type IsStrictObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : IsUnknown<T> extends true ? false
      : T extends AnyObject ? T extends AnyFunction ? false : T extends any[] ? false : true
        : false;

/**
 * Allow modify interfaces or object types without the restrictions of use extends or & operator
 */
export type Modify<T, U> = IsStrictObject<T> extends true
  ? IsStrictObject<U> extends true
    ? Omit<T, keyof U> & U
    : T
  : T;

/**
 * Recreate complex types for readability.
 * Do not change nothing, return the same type.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Pick properties from an object type `T` whose values match any of the types specified in `ValuesToPick`.
 *
 * @template T - The original type to pick properties from.
 * @template ValuesToPick - A tuple of the types of the values you want to pick.
 *
 * @example
 * type T1 = { a: string; b: number; c: string | number; };
 * type R1 = PickByValue<T1, [string, number]>;
 * //   ^? { a: string; b: number; }
 * type R2 = PickByValue<T1, [string | number]>;
 * //   ^? { c: string | number; }
 */
export type PickByValue<
  T,
  ValuesToPick extends unknown[],
  _result = {},
> = Or<[Not<IsTuple<ValuesToPick>>, IsEmptyArray<ValuesToPick>]> extends true
  ? Prettify<_result>
  : ValuesToPick extends [infer X, ...infer Rest]
    ? PickByValue<T, Rest, _result & {
      [Key in keyof T as If<Equals<T[Key], X>, Key>]: T[Key]
    }>
    : never;