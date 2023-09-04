import { KeyOfObject, Modify, Prettify } from '.';
import { ShiftRecursive, UnionToTupleCombination } from '../arrays';
import { Cast } from '../generals';

type _ModifyByTuple<T, U, V, Result = T> = V extends []
  ? Result
  : V extends [infer Current, ...infer Rest]
    ? _ModifyByTuple<T, U, Rest, Modify<Result, U[Cast<Current, keyof U>]>>
    : never;

type _ModifyByKeyPlusCombinations<
  T,
  U,
  K extends KeyOfObject,

  _combinations extends unknown[] = UnionToTupleCombination<keyof U>,
  combinations extends unknown[] = _combinations | ShiftRecursive<_combinations, 1>,

  Result = combinations extends combinations
    ? { readonly [_ in K]: combinations } & _ModifyByTuple<T, U, combinations>
    : never,

> = Prettify<{ readonly [_ in K]?: undefined } & T | Result>;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator
 * Creates a Union Discrimated Type with the overrides + the keys pased for modify the object
 * Also create the combinations of override the mainType with two or more types in the overrides.
 */
export type ModifyByKeyPlusCombinations<T, U, KeyToDiscrimitate extends KeyOfObject = '__keys'> = _ModifyByKeyPlusCombinations<T, U, KeyToDiscrimitate>;