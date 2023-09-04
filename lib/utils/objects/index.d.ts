import { AnyFunction, AnyObject, KeyOfObject } from '../../constants';
import { IsAny } from '../any';
import { IsEmptyArray, IsTuple } from '../arrays';
import { And, Not, Or } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { IsNever } from '../never';
import { IsUnknown } from '../unknow';

export * from './ModifyPlusOrderedCombinations';
export * from './ModifyPlusCombinations';

/**
 * Return true if type is of type object array or function
 * if you are searching for only object use IsStrictObject instead.Som
*/
export type IsObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : T extends AnyObject ? true
      : false;

/**
 * Return true if type is of type object ignoring arrays.
*/
//! WARNING: this type have a internal version please update it if you change this implementation
export type IsStrictObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : IsUnknown<T> extends true ? false
      : T extends AnyObject ? T extends AnyFunction ? false : T extends any[] ? false : true
        : false;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator.
 */
export type Modify<T, U> = IsStrictObject<T> extends true
  ? IsStrictObject<U> extends true
    ? Prettify<Omit<T, keyof U> & U>
    : T
  : T;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator
 * Creates a Union Discrimated Type with the overrides + the keys pased for modify the object.
 */
export type ModifyByKey<T, U, KeyToDiscrimitate extends KeyOfObject = '__key'> = If<{
  condition: And<[IsStrictObject<T>, IsStrictObject<U>]>;
  type: Prettify<{ [_ in KeyToDiscrimitate]?: undefined } & T | { [Key in keyof U]: { [_ in KeyToDiscrimitate]: Key } & Modify<T, U[Key]> }[keyof U]>;
  else: T;
}>;

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
 * @template Type - The original type to pick properties from.
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
  Type,
  ValuesToPick extends unknown[],
  _result = {},
> = Or<[Not<IsTuple<ValuesToPick>>, IsEmptyArray<ValuesToPick>]> extends true
  ? Prettify<_result>
  : ValuesToPick extends [infer X, ...infer Rest]
    ? PickByValue<Type, Rest, _result & {
      [Key in keyof Type as _RT.IfSingleLine<Equals<Type[Key], X>, Key>]: Type[Key]
    }>
    : never;

/**
 * Returns if the object can be `{}`
 * @example
 * type A = CanBeEmptyObject<{ a?: 'a'; b?: 'b';}>
 * //   ^? true
 * type B = CanBeEmptyObject<{ a?: 'a'; b: 'b';}>
 * //   ^? false b is required.
 */
export type CanBeEmptyObject<Type> = {} extends Type ? true : false;

/**
 * Returns the required keys of an object
 * @example
 * type U = RequiredKeys<{ a?: 'a'; b: 'b'; c: 'a' }>
 * //   ^? "b" | "c"
 */
export type RequiredKeys<Type> = {
  [Key in keyof Type]-?: If<Not<CanBeEmptyObject<{ [_ in Key]: Type[Key] }>>, Key>
}[keyof Type];

/**
 * Returns the optional  keys of an object
 * @example
 * type U = OptionalKeys<{ a?: 'a'; b?: 'b'; c: 'a' }>
 * //   ^? "a" | "b"
 */
export type OptionalKeys<Type> = {
  [Key in keyof Type]-?: If<CanBeEmptyObject<{ [_ in Key]: Type[Key] }>, Key>
}[keyof Type];
