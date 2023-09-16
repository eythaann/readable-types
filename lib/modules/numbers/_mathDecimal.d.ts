import { Shift } from '../arrays';
import { And, Or } from '../booleans';
import { Equals } from '../comparison';
import { If } from '../conditions';
import { IsNever } from '../never';
import { TupleToString, Split } from '../strings';
import { IsUnknown } from '../unknow';

type decimal = DecimalHashMap[0][number];

interface Operation {
  result: any;
  carryOut: any;
}

type DecimalHashMap = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  2: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
  3: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
  4: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
  5: [5, 6, 7, 8, 9, 0, 1, 2, 3, 4];
  6: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
  7: [7, 8, 9, 0, 1, 2, 3, 4, 5, 6];
  8: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7];
  9: [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};

type ToDecimal<str, strNumber = _RT.ForceExtract<DecimalHashMap[0], str>> = _RT.IfSingleLine<Or<[IsNever<str>, IsUnknown<strNumber>]>, 0, strNumber>;

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

export namespace Addition {
  type GetSum<A, B> = _RT.ForceExtract<_RT.ForceExtract<DecimalHashMap, A>, B>;

  type GetSumCarry<A, B> = B extends _RT.ForceExtract<CarryOn, A> ? 1 : 0;

  type sumDecimal<A, B, CarryIn> = {
    result: GetSum<GetSum<A, B>, CarryIn>;
    carryOut: If<And<[Equals<CarryIn, 1>, Equals<A, 9>]>, 1, GetSumCarry<GetSum<A, CarryIn>, B>>;
  };

  type _AdditionOnShifted<A, B, CarryIn = 0> = sumDecimal<ToDecimal<_RT.ForceExtract<A, 'extracted'>>, ToDecimal<_RT.ForceExtract<B, 'extracted'>>, CarryIn>;

  type _next<A, B, lastIncompleteResult, lastCarryOut, _actualSum = _AdditionOnShifted<A, B, lastCarryOut>> = MakeAdditionOnTuple<
  _RT.ForceExtract<A, 'rest'>,
  _RT.ForceExtract<B, 'rest'>,
  // @ts-ignore
  [_RT.ForceExtract<_actualSum, 'result'>, ...lastIncompleteResult],
  _RT.ForceExtract<_actualSum, 'carryOut'>
  >;

  type MakeAdditionOnTuple<
    A,
    B,
    lastIncompleteResult = [],
    lastCarryOut = 0,
  > = A extends []
    ? B extends []
      // @ts-ignore
      ? lastCarryOut extends 0 ? lastIncompleteResult : [lastCarryOut, ...lastIncompleteResult]
      : _next<_RT.Array.Pop<A>, _RT.Array.Pop<B>, lastIncompleteResult, lastCarryOut>
    : _next<_RT.Array.Pop<A>, _RT.Array.Pop<B>, lastIncompleteResult, lastCarryOut>;

  export type Add<A, B> = TupleToString<MakeAdditionOnTuple<Split<_RT.ForceToString<A>>, Split<_RT.ForceToString<B>>>>;
}

export namespace Substraction {
  type substractMap = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  type substractMapForCarry = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  type GetSustract<A, B> = _RT.ForceExtract<_RT.ForceExtract<DecimalHashMap, A>, _RT.ForceExtract<substractMap, B>>;

  type getSustractCarry<A, B> = B extends _RT.ForceExtract<CarryOn, _RT.ForceExtract<substractMapForCarry, A>> ? 1 : 0;

  type sustractDecimal<A, B, CarryIn, Result = GetSustract<GetSustract<A, CarryIn>, B>> = {
    result: Result;
    carryOut: If<And<[Equals<CarryIn, 1>, Equals<B, 9>]>, 1, getSustractCarry<A, Result>>;
  };

  type _SubstractOnShifted<A, B, CarryIn = 0> = sustractDecimal<ToDecimal<_RT.ForceExtract<A, 'extracted'>>, ToDecimal<_RT.ForceExtract<B, 'extracted'>>, CarryIn>;

  type _next<A, B, lastIncompleteResult, lastCarryOut, actualSustract = _SubstractOnShifted<A, B, lastCarryOut>> = MakeSubstractOnTuple<
  _RT.ForceExtract<A, 'rest'>,
  _RT.ForceExtract<B, 'rest'>,
  // @ts-ignore
  [_RT.ForceExtract<actualSustract, 'result'>, ...lastIncompleteResult],
  _RT.ForceExtract<actualSustract, 'carryOut'>
  >;

  type MakeSubstractOnTuple<A, B, Result = [], CarryIn = 0> = A extends []
    ? Result
    : _next<_RT.Array.Pop<A>, _RT.Array.Pop<B>, Result, CarryIn>;

  type _substract<A_Tuple, B_Tuple> = __beta__BiggerThan<A_Tuple, B_Tuple> extends true
    ? TupleToString<MakeSubstractOnTuple<A_Tuple, B_Tuple>>
    : `-${TupleToString<MakeSubstractOnTuple<B_Tuple, A_Tuple>>}`;

  export type Substract<A, B> = _substract<Split<_RT.ForceToString<A>>, Split<_RT.ForceToString<B>>>;
}

interface BiggerTable {
  0: never;
  1: 0;
  2: this[1] | 1;
  3: this[2] | 2;
  4: this[3] | 3;
  5: this[4] | 4;
  6: this[5] | 5;
  7: this[6] | 6;
  8: this[7] | 7;
  9: this[8] | 8;
}

export type __beta__BiggerThan<
  A_Tuple,
  B_Tuple,
  A_Length = _RT.ForceExtract<A_Tuple, 'length'>,
  B_Length = _RT.ForceExtract<B_Tuple, 'length'>,
> = Equals<A_Length, B_Length> extends true
  ? A_Length extends 0
    ? false
    //@ts-ignore
    : ToDecimal<B_Tuple[0]> extends BiggerTable[ToDecimal<A_Tuple[0]>]
      ? true
      //@ts-ignore
      : __beta__BiggerThan<Shift<A_Tuple>, Shift<B_Tuple>>
  : __beta__BiggerThan<Split<_RT.ForceToString<A_Length>>, Split<_RT.ForceToString<B_Length>>>;