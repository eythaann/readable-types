import { IsAny } from '../any';
import { If } from '../conditions';
import { Cast } from '../generals';
import { IsNever } from '../never';

/**
 * Evaluates if the specified type is a boolean.
 *
 * @example
 * type A = IsBoolean<boolean>;
 * //   ^? true
 * type B = IsBoolean<string>;
 * //   ^? false
 * type C = IsBoolean<boolean | never>;
 * //   ^? true
 */
export type IsBoolean<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, [T] extends [boolean] ? true : false>;

/**
 * Performs a logical AND operation on a tuple of boolean values.
 * It returns true only when all values in the tuple are true.
 *
 * @example
 * type A = And<[true, true, true]>;
 * //   ^? true
 * type B = And<[true, false, true]>;
 * //   ^? false
 */
export type And<T extends boolean[]> = If<IsNever<Extract<T[number], false>>, true, false>;

/**
 * Performs a logical OR operation on a tuple of boolean values.
 * It returns true if at least one value in the tuple is true.
 *
 * @example
 * type A = Or<[false, false, true]>;
 * //   ^? true
 * type B = Or<[false, false, false]>;
 * //   ^? false
 */
export type Or<T extends boolean[]> = If<IsNever<Extract<T[number], true>>, false, true>;

/**
 * Performs a XOR operation on an array of boolean values.
 * @example
 * type A = Or<[false, false, true]>;
 * //   ^? true
 * type A = Or<[false, true, true]>;
 * //   ^? false
 * type B = Or<[false, false, false]>;
 * //   ^? false
 */
export type XOR<T extends boolean[], trueFinded extends boolean = false> = T extends [infer X, ...infer newT]
  ? If<And<[Cast<X, boolean>, trueFinded]>, false, XOR<Cast<newT, boolean[]>, Or<[Cast<X, boolean>, trueFinded]>>>
  : trueFinded;

/**
 * Performs a logical NOT operation on a boolean value.
 * It returns the opposite boolean value of the input.
 *
 * @example
 * type A = Not<true>;
 * //   ^? false
 * type B = Not<false>;
 * //   ^? true
 */
export type Not<T extends boolean> = T extends true ? false : true;

/**
 * Performs a logical NOT operation on a boolean value conditionally.
 *
 * @example
 * type A = NotIf<true, true>;
 * //   ^? false
 * type B = NotIf<true, false>;
 * //   ^? true
 * type C = NotIf<false, true>;
 * //   ^? true
 * type D = NotIf<false, false>;
 * //   ^? false
 */
export type NotIf<Condition extends boolean, T extends boolean> = If<Condition, Not<T>, T>;

/*
  -
  -
  -
  -
  ---- ALIASES ZONE ----
  -
  -
  -
  -
*/

/** @alias And */
export type All<T extends boolean[]> = And<T>;

/** @alias And */
export type Every<T extends boolean[]> = And<T>;

/** @alias Or */
export type Some<T extends boolean[]> = Or<T>;