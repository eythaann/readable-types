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
export type IsNumber<T> = _RT.IsType<T, number>;

export type StrToNumber<T> = T extends `${infer X extends number}` ? X : never;