import { isType } from '../internals';

import { isEmptyArray, isTuple } from '../arrays-and-tuples/infrastructure';
import { equals } from '../comparison/infrastructure';
import { $keyof, SerializableBySelf, waitFor } from '../generals/infrastructure';
import { nonUndefined } from '../undefined/infrastructure';

import { assign } from './app';

import { empty_object_key } from './domain';

export * from './app/ModifyPlusCombinations';

/** @alias PropertyKey */
export type KeyOfObject = PropertyKey;

declare global {
  /**
   * Allow only objects (no primitives, no arrays, no functions),
   * This have a bug when using interfaces, so maybe you wanna use strictObject instead.
   * */
  type unknownObject = { [key in PropertyKey]: unknown };

  /** Allow only objects (no primitives, no arrays, no functions). */
  type strictObject = object & { length?: never };

  /** @warning `any` less primitive values. Try no use it. */
  type anyObject = { [key in PropertyKey]: any };

  type emptyObject = { [empty_object_key]?: never };

  /** any constructor */
  type Constructor<T = any> = new (...args: any[]) => T;

  /** any abstract constructor */
  type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;
}

/**
 * todo description
 */
export type Plain<T> = { [K in keyof T as T[K] extends anyFunction ? never : K]: T[K] };

/**
 * todo description
 */
export type toJSON<T> = _toJSON<T> & {};
type _toJSON<T, R = Plain<T>> = R extends SerializableBySelf<T> ? R : Error<'Can not serialize this object.'>;

/**
 * Return true if type is of type object array or function
 * if you are searching for only object use IsStrictObject instead.
 */
export type isObject<T> = isType<T, anyObject>;

/**
 * Return true if type is of type object ignoring arrays and functions.
 */
export type isStrictObject<T> = isType<T, strictObject>;

/**
 * Same as `modify` but less pretty and preserving the context of `this`.
 * This can't override `()` and `new()` properties.
 */
export type modifyInterface<T extends object, U extends object> = waitFor<T, assign<T, U>>;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator.
 */
export type modify<T, U> = $if<
isStrictObject<T> & isStrictObject<U>,
  {
  //@ts-ignore
    then: prettify<assign<T, U>>;
    else: T;
  }
>;

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
 * type R1 = pickByValue<T1, [string, number]>;
 * //   ^? { a: string; b: number; }
 * type R2 = pickByValue<T1, [string | number]>;
 * //   ^? { c: string | number; }
 */
export type pickByValue<Type, ValuesToPick extends unknown[], _result = {}> = $if<
not<isTuple<ValuesToPick>> | isEmptyArray<ValuesToPick>,
  {
    then: prettify<_result>;
    else: ValuesToPick extends [infer X, ...infer Rest]
      ? pickByValue<
        Type,
        Rest,
    _result & {
      [Key in keyof Type as $if<
        equals<Type[Key], X>,
        {
          then: Key;
          else: never;
        }
      >]: Type[Key];
    }
      >
      : never;
  }
>;

/**
 * Returns if the object can be `{}`
 * @example
 * type A = CanBeEmptyObject<{ a?: 'a'; b?: 'b';}>
 * //   ^? true
 * type B = CanBeEmptyObject<{ a?: 'a'; b: 'b';}>
 * //   ^? false b is required.
 */
export type canBeEmptyObject<Type extends unknownObject> = [{}] extends [Type] ? true : false;

/**
 * Returns the keys of an object which are `readonly`.
 * @example
 * type U = getReadonlyKeys<{ a: number, readonly b: string }>;
 * //   ^? "b"
 */
export type getReadonlyKeys<Type> = {
  [Key in keyof Type]-?: $if<
    equals<{ readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>,
    {
      then: Key;
      else: never;
    }
  >;
}[keyof Type];

/**
 * Returns the keys of an object which are not `readonly`.
 * @example
 * type U = getNoReadonlyKeys<{ a: number, readonly b: string }>;
 * //   ^? "a"
 */
export type getNoReadonlyKeys<Type> = {
  [Key in keyof Type]-?: $if<
    equals<{ -readonly [_ in Key]: Type[Key] }, { [_ in Key]: Type[Key] }>,
    {
      then: Key;
      else: never;
    }
  >;
}[keyof Type];

/**
 * Returns the required keys of an object
 * @example
 * type U = getRequiredKeys<{ a?: 'a'; b: 'b'; c: 'a' }>
 * //   ^? "b" | "c"
 */
export type getRequiredKeys<Type> = {
  [Key in keyof Type]-?: $if<
    not<canBeEmptyObject<{ [_ in Key]: Type[Key] }>>,
    {
      then: Key;
      else: never;
    }
  >;
}[keyof Type];

/**
 * Returns the optional  keys of an object
 * @example
 * type U = getOptionalKeys<{ a?: 'a'; b?: 'b'; c: 'a' }>
 * //   ^? "a" | "b"
 */
export type getOptionalKeys<Type> = {
  [Key in keyof Type]-?: $if<
    canBeEmptyObject<{ [_ in Key]: Type[Key] }>,
    {
      then: Key;
      else: never;
    }
  >;
}[keyof Type];

/**
 * Return if the object have a specifit property.
 * @example
 * type U = hasProperty<{ a?: 'a'; b?: 'b'; c: 'c' }, 'c'>
 * //   ^? true
 */
export type hasProperty<T, K> = K extends $keyof<T> ? true : false;

/**
 * Convert specific properties of an object `T` to readonly.
 * @example
 * type U = someToReadonly<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { readonly a: 'a', b: 'b' }
 */
export type someToReadonly<T, K extends $keyof<T>> = prettify<
Omit<T, K> & { readonly [key in K]: T[K] }
>;

/**
 * Remove readonly to specific properties of an object `T`.
 * @example
 * type U = someToWritable<{ readonly a: 'a'; readonly b: 'b' }, 'a'>
 * //   ^? { a: 'a', readonly b: 'b' }
 */
export type someToWritable<T, K extends $keyof<T>> = prettify<
Omit<T, K> & { -readonly [key in K]: T[K] }
>;

/**
 * Convert specific properties of an object `T` to optional.
 * @example
 * type U = someToPartial<{ a: 'a'; b: 'b' }, 'a'>
 * //   ^? { a?: 'a', b: 'b' }
 */
export type someToPartial<T, K extends $keyof<T>> = prettify<Omit<T, K> & { [key in K]?: T[K] }>;

/**
 * Make specific properties of an object `T` required.
 * @example
 * type U = someToRequired<{ a?: 'a'; b?: 'b' }, 'a'>
 * //   ^? { a: 'a', b: 'b' }
 */
export type someToRequired<T, K extends $keyof<T>> = prettify<
Omit<T, K> & { [key in K]-?: nonUndefined<T[K]> }
>;

/**
 * Converts a tuple to an object.
 *
 * @example
 * type a = TupleToObject<[string, number]>
 * //   ^? { 0: string; 1: number; }
 */
export type TupleToObject<T> = { [K in Exclude<keyof T, keyof []>]: T[K] };
