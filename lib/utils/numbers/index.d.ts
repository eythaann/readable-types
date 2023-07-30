/**
 * Evaluates if the specified type is a number.
 *
 * @example
 * type A = IsNumber<number>;
 * //   ^? true
 * type B = IsNumber<string>;
 * //   ^? false
 * type C = IsNumber<number | never>;
 * //   ^? true
 */
export type IsNumber<T> = RT_INTERNAL.IsType<T, number>;