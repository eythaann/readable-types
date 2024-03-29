import { forceExtract, forceToString } from '../../../modules/internals';
import { ToDecimal } from './addition';
import { InternalBiggerThan } from './arimetic';

import { equals } from '../../../modules/comparison/infrastructure';
import { join, split } from '../../../modules/strings/infrastructure';

import { forceConcat, Pop } from '../../../modules/arrays-and-tuples/app';

import { CarryOnAddition, DecimalHashMap } from '../domain';

type substractMap = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
type substractMapForCarry = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

type GetSustract<A, B> = forceExtract<forceExtract<DecimalHashMap, A>, forceExtract<substractMap, B>>;

type getSustractCarry<A, B> = B extends forceExtract<CarryOnAddition, forceExtract<substractMapForCarry, A>> ? 1 : 0;

type sustractDecimal<A, B, CarryIn, Result = GetSustract<GetSustract<A, CarryIn>, B>> = {
  result: Result;
  carryOut: $if<(equals<CarryIn, 1> & equals<B, 9>), {
    then: 1;
    else: getSustractCarry<A, Result>;
  }>;
};

type _SubstractOnShifted<A, B, CarryIn = 0> = sustractDecimal<ToDecimal<forceExtract<A, 'extracted'>>, ToDecimal<forceExtract<B, 'extracted'>>, CarryIn>;

type _next<A, B, lastIncompleteResult, lastCarryOut, actualSustract = _SubstractOnShifted<A, B, lastCarryOut>> = MakeSubstractOnTuple<
  forceExtract<A, 'rest'>,
  forceExtract<B, 'rest'>,
  forceConcat<[forceExtract<actualSustract, 'result'>], lastIncompleteResult>,
  forceExtract<actualSustract, 'carryOut'>
>;

type removeZeros<T> = T extends [infer C, ...infer R] ? C extends 0 ? removeZeros<R> : T : T;

type MakeSubstractOnTuple<A, B, Result = [], CarryIn = 0> = A extends []
  ? removeZeros<Result>
  : _next<Pop<A>, Pop<B>, Result, CarryIn>;

// Todo(eythan) remove ts-ignore added for @5.4: Type instantiation is excessively deep and possibly infinite.
type MakeSubstract<A_Digits, B_Digits> = InternalBiggerThan<B_Digits, A_Digits> extends true
  //@ts-ignore
  ? `-${join<MakeSubstractOnTuple<B_Digits, A_Digits>>}`
  //@ts-ignore
  : join<MakeSubstractOnTuple<A_Digits, B_Digits>>;

export type InternalSubstract<A, B, R = MakeSubstract<split<forceToString<A>>, split<forceToString<B>>>> =
  R extends ''
    ? 0
    : R extends`${infer X extends number}`
      ? X
      : never;
