import { And } from '../../../booleans';
import { Equals } from '../../../comparison';
import { If } from '../../../conditions';
import { Split, TupleToString } from '../../../strings';
import { CarryOnAddition, DecimalHashMap } from '../domain';

type ToDecimal<str> = _RT.ForceExtract<DecimalHashMap[0], str>;

type GetSum<A, B> = _RT.ForceExtract<_RT.ForceExtract<DecimalHashMap, A>, B>;

type GetSumCarry<A, B> = B extends _RT.ForceExtract<CarryOnAddition, A> ? 1 : 0;

type sumDecimal<A, B, CarryIn> = {
  result: GetSum<GetSum<A, B>, CarryIn>;
  carryOut: If<And<[Equals<CarryIn, 1>, Equals<A, 9>]>, 1, GetSumCarry<GetSum<A, CarryIn>, B>>;
};

type _next<
  A_Digits,
  B_Digits,
  lastIncompleteResult,
  lastCarryOut,

  _shiftedA = _RT.Array.Pop<A_Digits>,
  _shiftedB = _RT.Array.Pop<B_Digits>,
  _actualSum = sumDecimal<ToDecimal<_RT.ForceExtract<_shiftedA, 'extracted'>>, ToDecimal<_RT.ForceExtract<_shiftedB, 'extracted'>>, lastCarryOut>
> = MakeAdditionOnTuple<
_RT.ForceExtract<_shiftedA, 'rest'>,
_RT.ForceExtract<_shiftedB, 'rest'>,
_RT.Array.forceConcat<[_RT.ForceExtract<_actualSum, 'result'>], lastIncompleteResult>,
_RT.ForceExtract<_actualSum, 'carryOut'>
>;

type MakeAdditionOnTuple<
  A_Digits,
  B_Digits,
  lastIncompleteResult = [],
  lastCarryOut = 0,
> = A_Digits extends []
  ? B_Digits extends []
    ? lastCarryOut extends 0 ? lastIncompleteResult : _RT.Array.forceConcat<[lastCarryOut], lastIncompleteResult>
    : _next<A_Digits, B_Digits, lastIncompleteResult, lastCarryOut>
  : _next<A_Digits, B_Digits, lastIncompleteResult, lastCarryOut>;

export type InternalAdd<A, B> = TupleToString<
MakeAdditionOnTuple<Split<_RT.ForceToString<A>>, Split<_RT.ForceToString<B>>>
> extends `${infer x extends number}` ? x : never;