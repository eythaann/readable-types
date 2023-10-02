import { IsType } from '../app';

type stringtifible = string | number | bigint | boolean | null | undefined;

/**
 * Evaluates if the specified type is a string.
 *
 * @example
 * type A = IsString<string>;
 * //   ^? true
 * type B = IsString<number>;
 * //   ^? false
 * type C = IsString<never>;
 * //   ^? false
 */
export type IsString<T> = IsType<T, string>;

/**
 * `Stringtify` is a TypeScript utility type that takes a value (T) and transforms it into a string representation.
 * The input type T can be one of the following: string, number, bigint, boolean, null, or undefined.
 * For object types, the result is always '[object Object]'.
 *
 * @example
 * type A = Stringtify<42>;
 * //   ^? "42"
 * type B = Stringtify<true>;
 * //   ^? "true"
 * type C = Stringtify<null>;
 * //   ^? "null"
 * type D = Stringtify<undefined>;
 * //   ^? "undefined"
 * type E = Stringtify<{a: 1, b: 2}>;
 * //   ^? "[object Object]"
 */
export type Stringtify<T> = T extends stringtifible ? `${T}` : '[object Object]';

/**
* `TupleToString` is a TypeScript utility type that takes a tuple (T) and transforms it into a string representation.
* The elements of the tuple can be any of the types accepted by `Stringtify`. The result is a string
* that concatenates the stringified versions of the tuple elements.
*
* @example
* type F = TupleToString<[42, true, null, undefined, {a: 1, b: 2}]>;
* //   ^? "42truenullundefined[object Object]"
*/
export type TupleToString<T extends unknown[], Result extends string = ''> = T extends [infer X, ...infer Rest]
  ? TupleToString<Rest, `${Result}${Stringtify<X>}`>
  : Result;

/**
 * `Split` is a TypeScript utility type that takes a string (T) and transforms it into a tuple,
 * where each element of the tuple is a character of the original string. The characters in the
 * resulting tuple are in the same order as in the original string.
 *
 * @example
 * type A = Split<'Hello'>;
 * //   ^? ["H", "e", "l", "l", "o"]
 */
export type Split<T extends string, _Result extends unknown[] = []> = T extends '' ? _Result : T extends `${infer X}${infer R}` ? Split<R, [..._Result, X]> : never;

/**
 * `SplitReverce` is a TypeScript utility type similar to `Split`, but the characters in the
 * resulting tuple are in reverse order compared to the original string.
 *
 * @example
 * type B = SplitReverce<'Hello'>;
 * //   ^? ["o", "l", "l", "e", "H"]
 */
export type SplitReverce<T extends string, _Result extends unknown[] = []> = T extends '' ? _Result : T extends `${infer X}${infer R}` ? SplitReverce<R, [X, ..._Result]> : never;

/**
 * Determines if a string type `T` starts with another string type `S`.
 *
 * @example
 * type Result1 = startsWith<'hello', 'h'>;
 * //   ^? true
 */
export type startsWith<T extends string, S extends string> = T extends `${infer X}${infer _}` ? X extends S ? true : false : false;