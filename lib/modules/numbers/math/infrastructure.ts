import { InternalAdd } from './app/addition';
import { InternalSubstract } from './app/sustraction';

/**
 * The `add` type takes two numeric literal types and produces their sum as a number literal type.
 * @example
 * type Result = add<5, 10>;
 * //   ^? Result = 15
 *
 * type Result = add<2, 3>;
 * //   ^? Result = 5
 */
export type add<A extends number, B extends number> = InternalAdd<A, B>;

/**
 * The `substract` type takes two numeric literal types and produces their substraction as a number literal type.
 * @example
 * type Result = substract<10, 5>;
 * //   ^? Result = 5
 * type Result = substract<2, 3>;
 * //   ^? Result = -1
 */
export type substract<A extends number, B extends number> = InternalSubstract<A, B>;