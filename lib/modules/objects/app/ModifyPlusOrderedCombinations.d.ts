import { Modify } from '../infrastructure';
import { ForceExtract, ForceToString } from '../../app';
import { getTupleIndexes, nLengthTuple } from '../../arrays-and-tuples/infrastructure';
import { forceConcat } from '../../arrays-and-tuples/app';
import { TupleReduceHKT, UnionMapHKT, IteratorHKT } from '../../iterators/infrastructure';
import { IsNever } from '../../never/infrastructure';
import { InternalAdd } from '../../numbers/math/app/addition';
import { InternalBiggerThan } from '../../numbers/math/app/arimetic';

interface createGroup<L, Result extends unknown[], lastKey> extends IteratorHKT.Union {
  return: InternalBiggerThan<[lastKey], [this['current']]> extends true
    ? never
    : GetUnionGroupByNumericOrder<Exclude<this['all'], this['current']>, L, [...Result, this['current']], this['current']>;
}

type GetUnionGroupByNumericOrder<
  T,
  L,
  Result extends unknown[] = [],
  lastKey = 0,
> = `${Result['length']}` extends ForceToString<L> ? Result : UnionMapHKT<T, createGroup<L, Result, lastKey>>;

type GetAllPosibleGroupsByNumericOrder<
  T,
  current extends number | string = '1',
  lastResult = never,
  newResult = GetUnionGroupByNumericOrder<T, current>
> = IsNever<newResult> extends true ? lastResult : GetAllPosibleGroupsByNumericOrder<T, InternalAdd<current, 1>, lastResult | newResult>;

interface CreateAcumulativeModifiedHTK<mainObj, U, K extends string> extends IteratorHKT.Tuple {
  initialAcc: mainObj & { [_ in K]: [] };
  return: Modify<
  this['acc'],
  ForceExtract<ForceExtract<U, this['current']>, 1> & {
    readonly [_ in K]: forceConcat<ForceExtract<this['acc'], K>, [ForceExtract<ForceExtract<U, this['current']>, 0>]>
  }>;
}

interface CreateAllAcumulativeModifiedHTK<T, U, K extends string> extends IteratorHKT.Union<nLengthTuple<string>> {
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
> = (mainObj & { [_ in keyToDiscrimitate]?: undefined })
// @ts-ignore
| UnionMapHKT<
GetAllPosibleGroupsByNumericOrder<getTupleIndexes<overrides>>,
CreateAllAcumulativeModifiedHTK<mainObj, overrides, keyToDiscrimitate>
>;
