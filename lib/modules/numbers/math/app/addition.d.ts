import { ForceExtract, ForceToString } from '../../../app';
import { forceConcat, Pop } from '../../../arrays-and-tuples/app';
import { And } from '../../../booleans/infrastructure';
import { Equals } from '../../../comparison/infrastructure';
import { If } from '../../../conditions/infrastructure';
import { Split, TupleToString } from '../../../strings/infrastructure';
import { CarryOnAddition, DecimalHashMap } from '../domain';

type ToDecimal<str> = ForceExtract<DecimalHashMap[0], str>;

type GetSum<A, B> = ForceExtract<ForceExtract<DecimalHashMap, A>, B>;

type GetSumCarry<A, B> = B extends ForceExtract<CarryOnAddition, A> ? 1 : 0;

type sumDecimal<A, B, CarryIn> = {
  result: GetSum<GetSum<A, B>, CarryIn>;
  carryOut: If<And<[Equals<CarryIn, 1>, Equals<A, 9>]>, {
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
  _actualSum = sumDecimal<ToDecimal<ForceExtract<_shiftedA, 'extracted'>>, ToDecimal<ForceExtract<_shiftedB, 'extracted'>>, lastCarryOut>
> = MakeAdditionOnTuple<
ForceExtract<_shiftedA, 'rest'>,
ForceExtract<_shiftedB, 'rest'>,
forceConcat<[ForceExtract<_actualSum, 'result'>], lastIncompleteResult>,
ForceExtract<_actualSum, 'carryOut'>
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

export type InternalAdd<A, B> = TupleToString<
MakeAdditionOnTuple<Split<ForceToString<A>>, Split<ForceToString<B>>>
> extends `${infer x extends number}` ? x : never;