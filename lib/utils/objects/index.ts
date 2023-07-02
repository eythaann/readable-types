import { TupleType } from 'typescript';
import { AnyFunction, AnyObject } from '../../constants';
import { IsAny } from '../any';
import { IsEmptyArray, IsTuple } from '../arrays';
import { And, Not, Or } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { ValueOf } from '../generals';
import { _Cast } from '../generals/HTK';
import { IsNever } from '../never';
import { IsUnknown } from '../unknow';

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
    ? Prettify<Omit<T, keyof U> & U>
    : T
  : T;

export type ModifyByKey<T, U> = If<And<[IsStrictObject<T>, IsStrictObject<U>]>, Prettify<
{ __key?: undefined } & T
| { [Key in keyof U]: { __key?: Key } & Modify<T, U[Key]> }[keyof U]
>, T>;

export type ExtractByKey<T extends { __key?: string }, U extends unknown[]> = {
  [i in U['length']]: i;
};

type t = ModifyByKey<{
  prop1: '1';
  prop2: 1;
  prop3: null;
}, {
  ['feature1']: {
    prop1: 'overrided in 1';
    prop2: 'overrided in 1';
    prop3: 'overrided in 1';
    prop_for_1: 'newProp for 1';
  };
  ['feature2']: {
    prop1: 'overrided in 2';
    prop2: 'overrided in 2';
    prop3: 'overrided in 2';
    prop_for_2: 'newProp for 2';
  };
}>;

type t2 = ModifyByKey<{
  prop1: '1';
  prop2: 1;
  prop3: null;
}, {
  ['feature1']: {
    otherProp: '1';
    otherProp2: '1';
    otherProp3: '1';
    prop1: 'overrided in t2 f1';
  };
}>;

type t3 = ExtractByKey<t, ['feature1', 'feature2']>;

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
