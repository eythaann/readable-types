import { IsAny } from '../any';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';

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
export type IsNumber<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, [T] extends [number] ? true : false>;
