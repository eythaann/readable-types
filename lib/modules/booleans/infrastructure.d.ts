import { isType } from '../app';
import { isNever } from '../never/infrastructure';

/**
 * Evaluates if the specified type is a boolean.
 *
 * @example
 * type A = isBoolean<boolean>;
 * //   ^? true
 * type B = isBoolean<string>;
 * //   ^? false
 * type C = isBoolean<boolean | never>;
 * //   ^? true
 */
export type isBoolean<T> = isType<T, boolean>;

/**
 * Evaluates if the specified type is a `true`.
 */
export type isTrue<T> = isType<T, true>;

/**
 * Evaluates if the specified type is `false`.
 */
export type isFalse<T> = isType<T, false>;

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
export type And<T extends nLengthTuple<boolean>> = isNever<Extract<T[number], false>>;

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
export type Or<T extends nLengthTuple<boolean>> = Not<isNever<Extract<T[number], true>>>;

declare global {
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
  type Not<T extends boolean> = [T] extends [false] ? true : false;

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
  type NotIf<Condition extends boolean, T extends boolean> = If<Condition, {
    then: Not<T>;
    else: T;
  }>;
}

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
export type All<T extends nLengthTuple<boolean>> = And<T>;

/** @alias And */
export type Every<T extends nLengthTuple<boolean>> = And<T>;

/** @alias Or */
export type Some<T extends nLengthTuple<boolean>> = Or<T>;