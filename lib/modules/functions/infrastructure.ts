import { isType } from '../internals';

declare global {
  /** The type of "what a function is", extensible for any function type. */
  type anyFunction = (...args: any[]) => any;
}

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
export type isFunction<T> = isType<T, anyFunction>;