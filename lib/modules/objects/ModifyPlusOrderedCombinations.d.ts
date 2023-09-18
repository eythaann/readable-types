import { Modify, Prettify } from '.';
import { getTupleIndexes } from '../arrays';
import { TupleReduceHKT, UnionMapHKT, IteratorHKT } from '../iterators';
import { IsNever } from '../never';
import { __beta__BiggerThan } from '../numbers/_mathDecimal';
import { Add } from '../numbers/math';

interface createGroup<L, Result extends unknown[], lastKey> extends IteratorHKT.Union {
  return: __beta__BiggerThan<[lastKey], [this['current']]> extends true
    ? never
    : GetUnionGroupByNumericOrder<Exclude<this['all'], this['current']>, L, [...Result, this['current']], this['current']>;
}

type GetUnionGroupByNumericOrder<
  T,
  L,
  Result extends unknown[] = [],
  lastKey = 0,
> = `${Result['length']}` extends L ? Result : UnionMapHKT<T, createGroup<L, Result, lastKey>>;

type GetAllPosibleGroupsByNumericOrder<
  T,
  current extends number | string = '1',
  lastResult = never,
  newResult = GetUnionGroupByNumericOrder<T, current>
> = IsNever<newResult> extends true ? lastResult : GetAllPosibleGroupsByNumericOrder<T, Add<current, 1>, lastResult | newResult>;

interface CreateAcumulativeModifiedHTK<mainObj, U, K extends string> extends IteratorHKT.Tuple {
  initialAcc: mainObj & { [_ in K]: [] };
  return: Modify<
  this['acc'],
  _RT.ForceExtract<_RT.ForceExtract<U, this['current']>, 1> & {
    readonly [_ in K]: _RT.Array.forceConcat<_RT.ForceExtract<this['acc'], K>, [_RT.ForceExtract<_RT.ForceExtract<U, this['current']>, 0>]>
  }>;
}

interface CreateAllAcumulativeModifiedHTK<T, U, K extends string> extends IteratorHKT.Union<string[]> {
  return: TupleReduceHKT<this['current'], CreateAcumulativeModifiedHTK<T, U, K>>;
}

/**
 * Generates a new type by modifying `mainObj` with a series of overrides specified by `overrides` tuple array.
 * Each tuple contains a string key and an object with properties to merge into `mainObj`. The result is a union
 * type representing the combinations the specified order.
 *
 * `mainObj`: The primary object type to modify.
 *
 * `overrides`: An array of tuples where each tuple contains a string as its first element
 * to act as a key identifier and an object as its second element to specify the overrides.
 *
 * @example
 * type Result = ModifyByKeyPlusOrderedCombinations<{ test: 'test' }, [
 *  ['fet1', { newprop1: 1 }],
 *  ['fet2', { newprop2: 2 }],
 *  ['fet3', { newprop1: 3; newprop3: 3 }],
 * ]>;
 */
export type ModifyByKeyPlusOrderedCombinations<
  mainObj,
  overrides extends [string, any][],
  keyToDiscrimitate extends string = '__key'
> = Prettify<mainObj & { [_ in keyToDiscrimitate]?: undefined } | UnionMapHKT<
GetAllPosibleGroupsByNumericOrder<getTupleIndexes<overrides>>,
CreateAllAcumulativeModifiedHTK<mainObj, overrides, keyToDiscrimitate>
>>;
