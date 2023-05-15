import { IsAny } from '../any';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';

/**
 * Evaluates if the specified type is a string.
 *
 * @example
 * ```
 * type A = IsString<string>;
 * //   ^? true
 * type B = IsString<number>;
 * //   ^? false
 * type C = IsString<never>;
 * //   ^? false
 * ```
 */
export type IsString<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, [T] extends [string] ? true : false>;
