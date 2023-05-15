import { IsAny } from '../any';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';

/**
 * Evaluates if the specified type is `undefined`.
 *
 * @example
 * ```
 * type A = IsUndefined<undefined>;
 * //   ^? true
 *
 * type B = IsUndefined<number>;
 * //   ^? false
 *
 * type C = IsUndefined<number | undefined>;
 * //   ^? false
 * ```
 */
export type IsUndefined<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, [T] extends [undefined] ? true : false>;

/**
 * Evaluates if the specified type is `null`.
 *
 * @example
 * ```
 * type A = IsNull<null>;
 * //   ^? true
 *
 * type B = IsNull<number>;
 * //   ^? false
 *
 * type C = IsNull<number | null>;
 * //   ^? false
 * ```
 */
export type IsNull<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, [T] extends [null] ? true : false>;
