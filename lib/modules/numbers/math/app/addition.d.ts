import { forceExtract, forceToString } from '../../../app';
import { forceConcat, Pop } from '../../../arrays-and-tuples/app';
import { And } from '../../../booleans/infrastructure';
import { equals } from '../../../comparison/infrastructure';
import { split, join } from '../../../strings/infrastructure';
import { CarryOnAddition, DecimalHashMap } from '../domain';

type ToDecimal<str> = forceExtract<DecimalHashMap[0], str>;

type GetSum<A, B> = forceExtract<forceExtract<DecimalHashMap, A>, B>;

type GetSumCarry<A, B> = B extends forceExtract<CarryOnAddition, A> ? 1 : 0;

type sumDecimal<A, B, CarryIn> = {
  result: GetSum<GetSum<A, B>, CarryIn>;
  carryOut: If<And<[equals<CarryIn, 1>, equals<A, 9>]>, {
    then: 1;
    else: GetSumCarry<GetSum<A, CarryIn>, B>;
  }>;
};

type _next<
  A_Digits,
  B_Digits,
  lastIncompleteResult,
  lastCarryOut,

  _shiftedA = Pop<A_Digits>,
  _shiftedB = Pop<B_Digits>,
  _actualSum = sumDecimal<ToDecimal<forceExtract<_shiftedA, 'extracted'>>, ToDecimal<forceExtract<_shiftedB, 'extracted'>>, lastCarryOut>
> = MakeAdditionOnTuple<
forceExtract<_shiftedA, 'rest'>,
forceExtract<_shiftedB, 'rest'>,
forceConcat<[forceExtract<_actualSum, 'result'>], lastIncompleteResult>,
forceExtract<_actualSum, 'carryOut'>
>;

type MakeAdditionOnTuple<
  A_Digits,
  B_Digits,
  lastIncompleteResult = [],
  lastCarryOut = 0,
> = A_Digits extends []
  ? B_Digits extends []
    ? lastCarryOut extends 0 ? lastIncompleteResult : forceConcat<[lastCarryOut], lastIncompleteResult>
    : _next<A_Digits, B_Digits, lastIncompleteResult, lastCarryOut>
  : _next<A_Digits, B_Digits, lastIncompleteResult, lastCarryOut>;

export type InternalAdd<A, B> = join<
MakeAdditionOnTuple<split<forceToString<A>>, split<forceToString<B>>>
> extends `${infer x extends number}` ? x : never;