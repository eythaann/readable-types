import { IsAny } from '../any/infrastructure';

/**
 * Evaluates if the specified type is `unknown`.
 *
 * @example
 * type A = IsUnknown<unknown>;
 * //   ^? true
 * type B = IsUnknown<string>;
 * //   ^? false
 * type C = IsUnknown<any>;
 * //   ^? false
 */
/*
  ! WARNING: This utility has an internal implementation.
  If you are modifying this method, ensure to also update its corresponding internal implementation.
*/
export type IsUnknown<Type> = IsAny<Type> extends true ? false : unknown extends Type ? true : false;
