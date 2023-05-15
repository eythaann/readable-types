import { AnyFunction } from '../../constants';
import { IsAny } from '../any';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';

/**
 * Evaluates if the specified type is a function.
 *
 * @example
 * type A = IsFunction<() => void>;
 * //   ^? true
 *
 * type B = IsFunction<string>;
 * //   ^? false
 *
 * type C = IsFunction<() => void | never>;
 * //   ^? true
 */
export type IsFunction<T> = If<Or<[IsNever<T>, IsAny<T>]>, false, T extends AnyFunction ? true : false>;