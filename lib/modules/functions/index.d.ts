/** The min type of "what a function is", extensible for any function type. */
export type AnyFunction = (...args: any[]) => any;

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
export type IsFunction<T> = _RT.IsType<T, AnyFunction>;