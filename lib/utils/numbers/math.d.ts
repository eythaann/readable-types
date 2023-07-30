import { Add as AddDecimal } from './_mathDecimal';

/**
 * The `Add` type takes two numeric literal types and produces their sum as a string literal type.
 *
 * @template A Numeric literal type to be added.
 * @template B Numeric literal type to be added.
 *
 * @example
 * type Result = Add<5, 10>;
 * //   ^? Result = "15"
 *
 * type AnotherResult = Add<2, 3>;
 * //   ^? AnotherResult = "5"
 */
export type Add<A extends number, B extends number> = AddDecimal<A, B>;
