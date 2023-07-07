import { IsEmptyArray } from '../arrays';
import { And } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { Cast } from '../generals';
import { IsNever } from '../never';
import { TupleToString, SplitReverce, Stringtify } from '../strings';

type decimals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type decimal = decimals[number];

interface Carry {
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

type getCarry<
  A extends decimal,
  B extends decimal,
  T = Carry[A],
  R = T extends B ? 1 : never
> = If<IsNever<R>, 0, 1>;

type generateSumMap<
  T extends number,
  U extends unknown[] = decimals
> = U[0] extends T ? U : (U extends [infer X, ...infer R] ? generateSumMap<T, [...R, X]> : never);

type SumMap = {
  // @ts-ignore
  [A in decimal]: { [B in decimal]: generateSumMap<A>[B] }
};

type stringToDecimal = SumMap[0];

type sumDecimal<
  _A = 0,
  _B = 0,
  CarryIn extends 0 | 1 = 0,

  // @ts-ignore
  A extends decimal = stringToDecimal[_A],
  // @ts-ignore
  B extends decimal = stringToDecimal[_B],

  Sum = SumMap[Cast<SumMap[A][B], decimal>][CarryIn],
  CarryOut = If<And<[Equals<CarryIn, 1>, Equals<A, 9>]>, 1, getCarry<Cast<SumMap[A][CarryIn], decimal>, B>>
> = {
  sum: Sum;
  carryOut: CarryOut;
};

interface SUM {
  sum: any;
  carryOut: any;
}

interface unShiftedTuple {
  extracted: unknown;
  rest: unknown[];
}

type unShiftTuple<T extends unknown[]> = {
  extracted: T extends [infer T0, ...infer _] ? T0 : 0;
  rest: T extends [infer _, ...infer R] ? R : [];
};

type ResultOfSum<
  A extends unknown[],
  B extends unknown[],
  Result extends SUM[] = [],
  ActualCarry extends 0 | 1 = 0,

  _A extends unShiftedTuple = unShiftTuple<A>,
  _B extends unShiftedTuple = unShiftTuple<B>,

  _ActualSum extends SUM = sumDecimal<_A['extracted'], _B['extracted'], ActualCarry>
> = And<[IsEmptyArray<A>, IsEmptyArray<B>]> extends true
  ? ActualCarry extends 0 ? Result : [ActualCarry, ...Result]
  : ResultOfSum<_A['rest'], _B['rest'], [_ActualSum['sum'], ...Result], _ActualSum['carryOut']>;

export type Add<
  A extends string | number,
  B extends string | number,
> = TupleToString<ResultOfSum<SplitReverce<Stringtify<A>>, SplitReverce<Stringtify<B>>>>;
