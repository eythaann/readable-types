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
export type Or<T extends nLengthTuple<boolean>> = not<isNever<Extract<T[number], true>>>;

/**
 * Performs a logical NOT operation on a boolean value conditionally.
 *
 * @example
 * type A = Xor<true, true>;
 * //   ^? false
 * type B = Xor<true, false>;
 * //   ^? true
 * type C = Xor<false, true>;
 * //   ^? true
 * type D = Xor<false, false>;
 * //   ^? falses
 */
export type Xor<Condition extends boolean, T extends boolean> = $if<Condition, {
  then: not<T>;
  else: T;
}>;

declare global {
  /**
   * @rt_keyword
   *
   * Performs a logical NOT operation on a boolean value.
   * It returns the opposite boolean value of the input.
   *
   * @example
   * type A = not<true>;
   * //   ^? false
   * type B = not<false>;
   * //   ^? true
   */
  type not<T extends boolean> = [T] extends [false] ? true : false;
}