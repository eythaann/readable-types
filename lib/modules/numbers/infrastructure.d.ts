import { IsType } from '../app';

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
export type IsNumber<T> = IsType<T, number>;

/**
 * Converts a string representation of a number to a number type.
 * If the input isn't a string representation of a number, the result is `never`.
 * @example
 * type A = StrToNumber<'42'>;  // Result: number
 * type B = StrToNumber<'foo'>;  // Result: never
 */
export type StrToNumber<T> = T extends `${infer X extends number}` ? X : never;