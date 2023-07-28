import { Modify, Prettify } from '.';
import { IsEmptyArray, IsTuple, ShiftRecursive, UnionToTupleCombination } from '../arrays';
import { Not, Or } from '../booleans';
import { Equals } from '../comparison';
import { Cast } from '../generals';
import { TupleToString } from '../strings';

type _ModifyByTuple<T, U, V, Result = T> = V extends []
  ? Result
  : V extends [infer Current, ...infer Rest]
    ? _ModifyByTuple<T, U, Rest, Modify<Result, U[Cast<Current, keyof U>]>>
    : never;

export type ModifyByKeyPlusCombinations<
  T,
  U,

  _combinations extends unknown[] = UnionToTupleCombination<keyof U>,
  combinations extends unknown[] = _combinations | ShiftRecursive<_combinations, 1>,

  Result = combinations extends combinations
    ? combinations['length'] extends 1
      ? { readonly __key?: TupleToString<combinations> } & Modify<T, U[Cast<TupleToString<combinations>, keyof U>]>
      : { readonly __key?: combinations } & _ModifyByTuple<T, U, combinations>
    : never,

> = Prettify<{ readonly __key?: undefined } & T | Result>;

export type PickByValue<
  T,
  ValuesToPick extends unknown[],
  _result = {},
> = Or<[Not<IsTuple<ValuesToPick>>, IsEmptyArray<ValuesToPick>]> extends true
  ? Prettify<_result>
  : ValuesToPick extends [infer X, ...infer Rest]
    ? PickByValue<T, Rest, _result & {
      [Key in keyof T as RT_INTERNAL.IfSingleLine<Equals<T[Key], X>, Key>]: T[Key]
    }>
    : never;
