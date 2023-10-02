import { AnyObject, KeyOfObject } from './domain';
import { IsAny } from '../any/infrastructure';
import { IsEmptyArray, IsTuple } from '../arrays-and-tuples/infrastructure';
import { And, Not, Or } from '../booleans/infrastructure';
import { Equals } from '../comparison/infrastructure';
import { If } from '../conditions/infrastructure';
import { IsNever } from '../never/infrastructure';
import { IsUnknown } from '../unknow/infrastructure';
import { AnyFunction } from '../functions/infrastructure';
import { KeysOfUnion } from '../generals/infrastructure';
import { NonUndefined } from '../undefined/infrastructure';
import { SingleLineCondition } from '../conditions/app';

export * from './app/ModifyPlusOrderedCombinations';
export * from './app/ModifyPlusCombinations';
export * from './domain';

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
export type ModifyByKey<T, U, KeyToDiscrimitate extends KeyOfObject = '__key'> = If<And<[IsStrictObject<T>, IsStrictObject<U>]>, {
  then: Prettify<{ [_ in KeyToDiscrimitate]?: undefined } & T | { [Key in keyof U]: { [_ in KeyToDiscrimitate]: Key } & Modify<T, U[Key]> }[keyof U]>;
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
      [Key in keyof Type as SingleLineCondition<Equals<Type[Key], X>, Key>]: Type[Key]
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
 * Returns the keys of an object which are `readonly`.
 * @example
 * type U = ReadonlyKeys<{ a: number, readonly b: string }>;
 * //   ^? "b"
 */
export type ReadonlyKeys<Type> = {
  [Key in keyof Type]-?: If<Equals<{ readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>, {
    then: Key;
    else: never;
  }>
}[keyof Type];

/**
 * Returns the keys of an object which are not `readonly`.
 * @example
 * type U = NoReadonlyKeys<{ a: number, readonly b: string }>;
 * //   ^? "a"
 */
export type NoReadonlyKeys<Type> = {
  [Key in keyof Type]-?: If<Equals<{ -readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>, {
    then: Key;
    else: never;
  }>
}[keyof Type];

/**
 * Returns the required keys of an object
 * @example
 * type U = RequiredKeys<{ a?: 'a'; b: 'b'; c: 'a' }>
 * //   ^? "b" | "c"
 */
export type RequiredKeys<Type> = {
  [Key in keyof Type]-?: If<Not<CanBeEmptyObject<{ [_ in Key]: Type[Key] }>>, {
    then: Key;
    else: never;
  }>
}[keyof Type];

/**
 * Returns the optional  keys of an object
 * @example
 * type U = OptionalKeys<{ a?: 'a'; b?: 'b'; c: 'a' }>
 * //   ^? "a" | "b"
 */
export type OptionalKeys<Type> = {
  [Key in keyof Type]-?: If<CanBeEmptyObject<{ [_ in Key]: Type[Key] }>, {
    then: Key;
    else: never;
  }>
}[keyof Type];

/**
 * Return if the object have a specifit property.
 * @example
 * type U = HasProperty<{ a?: 'a'; b?: 'b'; c: 'c' }, 'c'>
 * //   ^? true
 */
export type HasProperty<T, K extends KeyOfObject> = K extends KeysOfUnion<T> ? true : false;

/**
 * Convert specific properties of an object `T` to readonly.
 * @example
 * type U = SomeToReadonly<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { readonly a: 'a', b: 'b' }
 */
export type SomeToReadonly<T, K extends KeysOfUnion<T>> = Prettify<Omit<T, K> & { readonly [key in K]: T[K] }>;

/**
 * Remove readonly to specific properties of an object `T`.
 * @example
 * type U = SomeToWritable<{ readonly a: 'a'; readonly b: 'b' }, 'a'>
 * //   ^? { a: 'a', readonly b: 'b' }
 */
export type SomeToWritable<T, K extends KeysOfUnion<T>> = Prettify<Omit<T, K> & { -readonly [key in K]: T[K] }>;

/**
 * Convert specific properties of an object `T` to optional.
 * @example
 * type U = SomeToPartial<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { a?: 'a', b: 'b' }
 */
export type SomeToPartial<T, K extends KeysOfUnion<T>> = Prettify<Omit<T, K> & { [key in K]?: T[K] }>;

/**
 * Make specific properties of an object `T` required.
 * @example
 * type U = SomeToRequired<{ a?: 'a'; b?: 'b' }, 'a'>
 * //   ^? { a: 'a', b: 'b' }
 */
export type SomeToRequired<T, K extends KeysOfUnion<T>> = Prettify<Omit<T, K> & { [key in K]-?: NonUndefined<T[K]> }>;
