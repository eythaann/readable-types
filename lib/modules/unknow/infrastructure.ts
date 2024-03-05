import { isAny } from '..';

/**
 * Evaluates if the specified type is `unknown`.
 *
 * @example
 * type A = isUnknown<unknown>;
 * //   ^? true
 * type B = isUnknown<string>;
 * //   ^? false
 * type C = isUnknown<any>;
 * //   ^? false
 */
export type isUnknown<Type> = isAny<Type> extends true ? false : unknown extends Type ? true : false;

/**
 * A utility type that substitutes a default type when the provided type is unknown.
 * @example
 * type A = defaultOnUnknown<unknown, string>;  // Result: string
 * type B = defaultOnUnknown<number, string>;  // Result: number
 */
export type defaultOnUnknown<Type, Default> = isUnknown<Type> extends true ? Default : Type;