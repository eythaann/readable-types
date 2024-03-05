import { isType } from '../internals';

/**
 * Evaluates if the specified type is a number.
 *
 * @example
 * type A = isNumber<number>;
 * //   ^? true
 * type B = isNumber<string>;
 * //   ^? false
 * type C = isNumber<number | never>;
 * //   ^? true
 */
export type isNumber<T> = isType<T, number>;
