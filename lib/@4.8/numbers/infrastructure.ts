/**
 * Converts a string representation of a number to a number type.
 * If the input isn't a string representation of a number, the result is `never`.
 * @example
 * type A = strToNumber<'42'>;  // Result: number
 * type B = strToNumber<'foo'>;  // Result: never
 */
export type strToNumber<T> = T extends `${infer X extends number}` ? X : never;