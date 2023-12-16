import { KeyOfObject, modify, prettify } from '../infrastructure';
import { ShiftRecursive, UnionToTupleCombination } from '../../arrays-and-tuples/infrastructure';
import { cast } from '../../generals/infrastructure';

type _ModifyByTuple<T, U, V, Result = T> = V extends []
  ? Result
  : V extends [infer Current, ...infer Rest]
    ? _ModifyByTuple<T, U, Rest, modify<Result, U[cast<Current, keyof U>]>>
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

> = prettify<{ readonly [_ in K]?: undefined } & T | Result>;

/**
 * Allow modify interfaces or object types without the restrictions of use `extends` or `&` operator
 * Creates a Union Discrimated Type with the overrides + the keys pased for modify the object
 * Also create the combinations of override the mainType with two or more types in the overrides.
 */
export type modifyByKeyPlusCombinations<T, U, KeyToDiscrimitate extends KeyOfObject = '__keys'> = _ModifyByKeyPlusCombinations<T, U, KeyToDiscrimitate>;