import { KeyOfObject } from './domain';
import { isEmptyArray, isTuple } from '../arrays-and-tuples/infrastructure';
import { And, Not, Or } from '../booleans/infrastructure';
import { equals } from '../comparison/infrastructure';
import { KeysOfUnion } from '../generals/infrastructure';
import { nonUndefined } from '../undefined/infrastructure';
import { isType } from '../app';

export * from './app/ModifyPlusOrderedCombinations';
export * from './app/ModifyPlusCombinations';
export * from './domain';

/**
 * Return true if type is of type object array or function
 * if you are searching for only object use IsStrictObject instead.
*/
export type isObject<T> = isType<T, anyObject>;

/**
 * Return true if type is of type object ignoring arrays and functions.
*/
export type isStrictObject<T> = isType<T, unknownObject>;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator.
 */
export type modify<T, U> = isStrictObject<T> extends true
  ? isStrictObject<U> extends true
    ? prettify<Omit<T, keyof U> & U>
    : T
  : T;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator
 * Creates a Union Discrimated Type with the overrides + the keys pased for modify the object.
 */
export type modifyByKey<T, U, KeyToDiscrimitate extends KeyOfObject = '__key'> = If<And<[isStrictObject<T>, isStrictObject<U>]>, {
  then: prettify<{ [_ in KeyToDiscrimitate]?: undefined } & T | { [Key in keyof U]: { [_ in KeyToDiscrimitate]: Key } & modify<T, U[Key]> }[keyof U]>;
  else: T;
}>;

/**
 * Recreate complex types for readability.
 * Do not change nothing, return the same type.
 */
export type prettify<T> = {
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
> = Or<[Not<isTuple<ValuesToPick>>, isEmptyArray<ValuesToPick>]> extends true
  ? prettify<_result>
  : ValuesToPick extends [infer X, ...infer Rest]
    ? PickByValue<Type, Rest, _result & {
      [Key in keyof Type as If<equals<Type[Key], X>, {
        then: Key;
        else: never;
      }>]: Type[Key]
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
export type canBeEmptyObject<Type> = {} extends Type ? true : false;

/**
 * Returns the keys of an object which are `readonly`.
 * @example
 * type U = ReadonlyKeys<{ a: number, readonly b: string }>;
 * //   ^? "b"
 */
export type readonlyKeys<Type> = {
  [Key in keyof Type]-?: If<equals<{ readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>, {
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
export type noReadonlyKeys<Type> = {
  [Key in keyof Type]-?: If<equals<{ -readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>, {
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
export type requiredKeys<Type> = {
  [Key in keyof Type]-?: If<Not<canBeEmptyObject<{ [_ in Key]: Type[Key] }>>, {
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
export type optionalKeys<Type> = {
  [Key in keyof Type]-?: If<canBeEmptyObject<{ [_ in Key]: Type[Key] }>, {
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
export type hasProperty<T, K> = K extends KeysOfUnion<T> ? true : false;

/**
 * Convert specific properties of an object `T` to readonly.
 * @example
 * type U = SomeToReadonly<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { readonly a: 'a', b: 'b' }
 */
export type SomeToReadonly<T, K extends KeysOfUnion<T>> = prettify<Omit<T, K> & { readonly [key in K]: T[K] }>;

/**
 * Remove readonly to specific properties of an object `T`.
 * @example
 * type U = SomeToWritable<{ readonly a: 'a'; readonly b: 'b' }, 'a'>
 * //   ^? { a: 'a', readonly b: 'b' }
 */
export type SomeToWritable<T, K extends KeysOfUnion<T>> = prettify<Omit<T, K> & { -readonly [key in K]: T[K] }>;

/**
 * Convert specific properties of an object `T` to optional.
 * @example
 * type U = SomeToPartial<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { a?: 'a', b: 'b' }
 */
export type SomeToPartial<T, K extends KeysOfUnion<T>> = prettify<Omit<T, K> & { [key in K]?: T[K] }>;

/**
 * Make specific properties of an object `T` required.
 * @example
 * type U = SomeToRequired<{ a?: 'a'; b?: 'b' }, 'a'>
 * //   ^? { a: 'a', b: 'b' }
 */
export type SomeToRequired<T, K extends KeysOfUnion<T>> = prettify<Omit<T, K> & { [key in K]-?: nonUndefined<T[K]> }>;
