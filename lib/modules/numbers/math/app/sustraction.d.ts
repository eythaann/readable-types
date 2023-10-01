import { And } from '../../../booleans';
import { Equals } from '../../../comparison';
import { If } from '../../../conditions';
import { Split, TupleToString } from '../../../strings';
import { CarryOnAddition, DecimalHashMap } from '../domain';
import { ToDecimal } from './addition';
import { InternalBiggerThan } from './arimetic';

type substractMap = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
type substractMapForCarry = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

type GetSustract<A, B> = _RT.ForceExtract<_RT.ForceExtract<DecimalHashMap, A>, _RT.ForceExtract<substractMap, B>>;

type getSustractCarry<A, B> = B extends _RT.ForceExtract<CarryOnAddition, _RT.ForceExtract<substractMapForCarry, A>> ? 1 : 0;

type sustractDecimal<A, B, CarryIn, Result = GetSustract<GetSustract<A, CarryIn>, B>> = {
  result: Result;
  carryOut: If<And<[Equals<CarryIn, 1>, Equals<B, 9>]>, 1, getSustractCarry<A, Result>>;
};

type _SubstractOnShifted<A, B, CarryIn = 0> = sustractDecimal<ToDecimal<_RT.ForceExtract<A, 'extracted'>>, ToDecimal<_RT.ForceExtract<B, 'extracted'>>, CarryIn>;

type _next<A, B, lastIncompleteResult, lastCarryOut, actualSustract = _SubstractOnShifted<A, B, lastCarryOut>> = MakeSubstractOnTuple<
_RT.ForceExtract<A, 'rest'>,
_RT.ForceExtract<B, 'rest'>,
_RT.Array.forceConcat<[_RT.ForceExtract<actualSustract, 'result'>], lastIncompleteResult>,
_RT.ForceExtract<actualSustract, 'carryOut'>
>;

type removeZeros<T> = T extends [infer C, ...infer R] ? C extends 0 ? removeZeros<R> : T : T;

type MakeSubstractOnTuple<A, B, Result = [], CarryIn = 0> = A extends []
  ? removeZeros<Result>
  : _next<_RT.Array.Pop<A>, _RT.Array.Pop<B>, Result, CarryIn>;

type MakeSubstract<A_Digits, B_Digits> = InternalBiggerThan<B_Digits, A_Digits> extends true
  ? `-${TupleToString<MakeSubstractOnTuple<B_Digits, A_Digits>>}`
  : TupleToString<MakeSubstractOnTuple<A_Digits, B_Digits>>;

export type InternalSubstract<A, B, R = MakeSubstract<Split<_RT.ForceToString<A>>, Split<_RT.ForceToString<B>>>> =
  R extends ''
    ? 0
    : R extends`${infer X extends number}`
      ? X
      : never;

type T0 = InternalSubstract<100, 109>;

type T = `${-1}` extends `${infer X extends number}` ? X : never;