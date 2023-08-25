import { Addition, Substraction } from './_mathDecimal';

/**
 * The `Add` type takes two numeric literal types and produces their sum as a string literal type.
 * @example
 * type Result = Add<5, 10>;
 * //   ^? Result = 15
 *
 * type Result = Add<2, 3>;
 * //   ^? Result = 5
 */
export type Add<A extends string | number, B extends string | number> = Addition.Add<A, B>;

/**
 * The `Add` type takes two numeric literal types and produces their substraction as a string literal type.
 * @example
 * type Result = Add<10, 5>;
 * //   ^? Result = 5
 * type Result = Add<2, 3>;
 * //   ^? Result = -1
 */
export type Substract<A extends string | number, B extends string | number> = Substraction.Substract<A, B>;