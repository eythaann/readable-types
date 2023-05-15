import { IsAny } from '../any';
import { And, Or } from '../booleans';

/**
 * Determines if two types are equal.
 *
 * @example
 * type A = Equals<string, string>;
 * //   ^? true
 * type B = Equals<string, number>;
 * //   ^? false
 * type C = Equals<any, string>;
 * //   ^? false
 * type D = Equals<any, any>;
 * //   ^? true
 */
export type Equals<T, U> = Or<[IsAny<T>, IsAny<U>]> extends true
  ? And<[IsAny<T>, IsAny<U>]>
  : [T] extends [U] ? [U] extends [T] ? true : false : false;

/**
 * Determines if type A is a supertype of type B.
 *
 * @example
 * type A = IsSuperType<number | string, string>;
 * //   ^? true
 * type B = IsSuperType<string, number | string>;
 * //   ^? false
 */
export type IsSuperType<A, B> = [B] extends [A] ? true : false;

/**
 * Determines if type A is a subtype of type B.
 *
 * @example
 * type A = IsSubType<string, number | string>;
 * //   ^? true
 * type B = IsSubType<number | string, string>;
 * //   ^? false
 */
export type IsSubType<A, B> = [A] extends [B] ? true : false;
