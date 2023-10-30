import { InternalAdd } from './app/addition';
import { InternalSubstract } from './app/sustraction';

/**
 * The `Add` type takes two numeric literal types and produces their sum as a string literal type.
 * @example
 * type Result = Add<5, 10>;
 * //   ^? Result = 15
 *
 * type Result = Add<2, 3>;
 * //   ^? Result = 5
 */
export type add<A extends number, B extends number> = InternalAdd<A, B>;

/**
 * The `Add` type takes two numeric literal types and produces their substraction as a string literal type.
 * @example
 * type Result = Add<10, 5>;
 * //   ^? Result = 5
 * type Result = Add<2, 3>;
 * //   ^? Result = -1
 */
export type substract<A extends number, B extends number> = InternalSubstract<A, B>;