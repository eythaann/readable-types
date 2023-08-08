import { And, Or } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { IsNever } from '../never';
import { TupleToString, Split } from '../strings';
import { IsUnknown } from '../unknow';

type decimals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type decimal = decimals[number];

interface CarryOn {
  0: never;
  1: 9;
  2: this[1] | 8;
  3: this[2] | 7;
  4: this[3] | 6;
  5: this[4] | 5;
  6: this[5] | 4;
  7: this[6] | 3;
  8: this[7] | 2;
  9: this[8] | 1;
}

type generateSumMapOf<
  Number extends decimal,
  Result extends unknown[] = decimals
> = Result[0] extends Number
  ? Result
  : (Result extends [infer X, ...infer R] ? generateSumMapOf<Number, [...R, X]> : never);

type SumMap = { [A in decimal]: generateSumMapOf<A> };

// @ts-ignore
type getCarry<A, B> = B extends CarryOn[A] ? 1 : 0;
// @ts-ignore
type GetSum<A, B> = SumMap[A][B];
// @ts-ignore
type ToDecimal<T, U = decimals[T]> = RT_INTERNAL.IfSingleLine<Or<[IsNever<T>, IsUnknown<U>]>, 0, U>;

type sumDecimal<
  A = 0,
  B = 0,
  CarryIn extends 1 | 0 = 0,

  Sum = GetSum<GetSum<A, B>, CarryIn>,
  CarryOut = If<And<[Equals<CarryIn, 1>, Equals<A, 9>]>, 1, getCarry<GetSum<A, CarryIn>, B>>
> = {
  sum: Sum;
  carryOut: CarryOut;
};

interface SUM {
  sum: any;
  carryOut: any;
}

type TupleResult<
  A extends unknown[],
  B extends unknown[],
  Result extends decimal[] = [],
  CarryIn extends 0 | 1 = 0,

  _A extends RT_INTERNAL.Array.shiftedTuple = RT_INTERNAL.Array.Pop<A>,
  _B extends RT_INTERNAL.Array.shiftedTuple = RT_INTERNAL.Array.Pop<B>,

  _ActualSum extends SUM = sumDecimal<ToDecimal<_A['extracted']>, ToDecimal<_B['extracted']>, CarryIn>

> = A extends []
  ? B extends []
    ? CarryIn extends 0 ? Result : [CarryIn, ...Result]
    : TupleResult<_A['rest'], _B['rest'], [_ActualSum['sum'], ...Result], _ActualSum['carryOut']>
  : TupleResult<_A['rest'], _B['rest'], [_ActualSum['sum'], ...Result], _ActualSum['carryOut']>;

export type Add<
  A extends string | number,
  B extends string | number,
> = TupleToString<TupleResult<Split<`${A}`>, Split<`${B}`>>>;
