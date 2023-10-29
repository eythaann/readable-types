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
export type IsUnknown<Type> = IsAny<Type> extends true ? false : unknown extends Type ? true : false;

/**
 * A utility type that substitutes a default type when the provided type is unknown.
 * @example
 * type A = DefaultOnUnknown<unknown, string>;  // Result: string
 * type B = DefaultOnUnknown<number, string>;  // Result: number
 */
export type DefaultOnUnknown<Type, Default> = IsUnknown<Type> extends true ? Default : Type;