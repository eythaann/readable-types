import { _Equals } from './app';

/**
 * Determines if two types are equal.
 *
 * @examples
 * type A = equals<string, string>;
 * //   ^? true
 * type B = equals<string, number>;
 * //   ^? false
 * type C = equals<any, string>;
 * //   ^? false
 * type D = equals<any, any>;
 * //   ^? true
 */
export type equals<A, B> = _Equals<A, B>;

/**
 * Determines if type A is a supertype of type B.
 *
 * @example
 * type A = IsSuperType<number | string, string>;
 * //   ^? true
 * type B = IsSuperType<string, number | string>;
 * //   ^? false
 */
export type isSupertype<A, B> = [B] extends [A] ? true : false;

/**
 * Determines if type A is a subtype of type B.
 *
 * @example
 * type A = IsSubType<string, number | string>;
 * //   ^? true
 * type B = IsSubType<number | string, string>;
 * //   ^? false
 */
export type isSubtype<A, B> = [A] extends [B] ? true : false;
