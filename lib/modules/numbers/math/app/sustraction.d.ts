import { ForceExtract, forceToString } from '../../../app';
import { forceConcat, Pop } from '../../../arrays-and-tuples/app';
import { And } from '../../../booleans/infrastructure';
import { equals } from '../../../comparison/infrastructure';
import { split, join } from '../../../strings/infrastructure';
import { CarryOnAddition, DecimalHashMap } from '../domain';
import { ToDecimal } from './addition';
import { InternalBiggerThan } from './arimetic';

type substractMap = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
type substractMapForCarry = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

type GetSustract<A, B> = ForceExtract<ForceExtract<DecimalHashMap, A>, ForceExtract<substractMap, B>>;

type getSustractCarry<A, B> = B extends ForceExtract<CarryOnAddition, ForceExtract<substractMapForCarry, A>> ? 1 : 0;

type sustractDecimal<A, B, CarryIn, Result = GetSustract<GetSustract<A, CarryIn>, B>> = {
  result: Result;
  carryOut: If<And<[equals<CarryIn, 1>, equals<B, 9>]>, {
    then: 1;
    else: getSustractCarry<A, Result>;
  }>;
};

type _SubstractOnShifted<A, B, CarryIn = 0> = sustractDecimal<ToDecimal<ForceExtract<A, 'extracted'>>, ToDecimal<ForceExtract<B, 'extracted'>>, CarryIn>;

type _next<A, B, lastIncompleteResult, lastCarryOut, actualSustract = _SubstractOnShifted<A, B, lastCarryOut>> = MakeSubstractOnTuple<
ForceExtract<A, 'rest'>,
ForceExtract<B, 'rest'>,
forceConcat<[ForceExtract<actualSustract, 'result'>], lastIncompleteResult>,
ForceExtract<actualSustract, 'carryOut'>
>;

type removeZeros<T> = T extends [infer C, ...infer R] ? C extends 0 ? removeZeros<R> : T : T;

type MakeSubstractOnTuple<A, B, Result = [], CarryIn = 0> = A extends []
  ? removeZeros<Result>
  : _next<Pop<A>, Pop<B>, Result, CarryIn>;

type MakeSubstract<A_Digits, B_Digits> = InternalBiggerThan<B_Digits, A_Digits> extends true
  ? `-${join<MakeSubstractOnTuple<B_Digits, A_Digits>>}`
  : join<MakeSubstractOnTuple<A_Digits, B_Digits>>;

export type InternalSubstract<A, B, R = MakeSubstract<split<forceToString<A>>, split<forceToString<B>>>> =
  R extends ''
    ? 0
    : R extends`${infer X extends number}`
      ? X
      : never;

type T0 = InternalSubstract<100, 109>;

type T = `${-1}` extends `${infer X extends number}` ? X : never;