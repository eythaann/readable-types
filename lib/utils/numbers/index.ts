import { IsAny } from '../any';
import { Tuple } from '../arrays';
import { Or } from '../booleans';
import { If } from '../conditions';
import { IsNever } from '../never';
import { Subtract } from './math';

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

export type stringToNumber<T extends string> = Tuple<any, T>['length'];

export type Range<From extends number, To extends number> = Subtract<To, From>;

type test = Range<30, 40>;
//   ^?

type test2 = Subtract<40, 30>;
//   ^?