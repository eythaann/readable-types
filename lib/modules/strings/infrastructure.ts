import { isType } from '../internals';

type stringtifible = string | number | bigint | boolean | null | undefined;

/**
 * Evaluates if the specified type is a string.
 *
 * @example
 * type A = isString<string>;
 * //   ^? true
 * type B = isString<number>;
 * //   ^? false
 * type C = isString<never>;
 * //   ^? false
 */
export type isString<T> = isType<T, string>;

/**
 * `stringtify` is a TypeScript utility type that takes a value (T) and transforms it into a string representation.
 * The input type T can be one of the following: string, number, bigint, boolean, null, or undefined.
 * For object types, the result is always '[object Object]'.
 *
 * @example
 * type A = stringtify<42>;
 * //   ^? "42"
 * type B = stringtify<true>;
 * //   ^? "true"
 * type C = stringtify<null>;
 * //   ^? "null"
 * type D = stringtify<undefined>;
 * //   ^? "undefined"
 * type E = stringtify<{a: 1, b: 2}>;
 * //   ^? "[object Object]"
 */
export type stringtify<T> = T extends stringtifible ? `${T}` : '[object Object]';

/**
* `join` is a TypeScript utility type that takes a tuple (T) and transforms it into a string representation.
* The elements of the tuple can be any of the types accepted by `stringtify`. The result is a string
* that concatenates the stringified versions of the tuple elements.
*
* @example
* type F = join<[42, true, null, undefined, {a: 1, b: 2}]>;
* //   ^? "42truenullundefined[object Object]"
*/
export type join<T extends unknown[], Result extends string = ''> = T extends [infer X, ...infer Rest]
  ? join<Rest, `${Result}${stringtify<X>}`>
  : Result;

/**
 * `split` is a TypeScript utility type that takes a string (T) and transforms it into a tuple,
 * where each element of the tuple is a character of the original string. The characters in the
 * resulting tuple are in the same order as in the original string.
 *
 * @example
 * type A = split<'Hello'>;
 * //   ^? ["H", "e", "l", "l", "o"]
 */
export type split<T extends string, _Result extends unknown[] = []> = T extends '' ? _Result : T extends `${infer X}${infer R}` ? split<R, [..._Result, X]> : never;

/**
 * `splitReverce` is a TypeScript utility type similar to `Split`, but the characters in the
 * resulting tuple are in reverse order compared to the original string.
 *
 * @example
 * type B = splitReverce<'Hello'>;
 * //   ^? ["o", "l", "l", "e", "H"]
 */
export type splitReverce<T extends string, _Result extends unknown[] = []> = T extends '' ? _Result : T extends `${infer X}${infer R}` ? splitReverce<R, [X, ..._Result]> : never;

/**
 * Determines if a string type `T` starts with another string type `S`.
 *
 * @example
 * type Result1 = startsWith<'hello', 'h'>;
 * //   ^? true
 */
export type startsWith<T extends string, S extends string> = T extends `${infer X}${infer _}` ? X extends S ? true : false : false;