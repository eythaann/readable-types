import { AnyFunction } from '../../constants';

/**
 * Evaluates if the specified type is a function.
 *
 * @example
 * type A = IsFunction<() => void>;
 * //   ^? true
 *
 * type B = IsFunction<string>;
 * //   ^? false
 *
 * type C = IsFunction<() => void | never>;
 * //   ^? true
 */
export type IsFunction<T> = RT_INTERNAL.IsType<T, AnyFunction>;