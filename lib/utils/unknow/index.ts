import { IsAny } from '../any';

/**
 * Evaluates if the specified type is `unknown`.
 *
 * @example
 * ```
 * type A = IsUnknown<unknown>;
 * //   ^? true
 * type B = IsUnknown<string>;
 * //   ^? false
 * type C = IsUnknown<any>;
 * //   ^? false
 * ```
 */
export type IsUnknown<Type> = IsAny<Type> extends true ? false : unknown extends Type ? true : false;
