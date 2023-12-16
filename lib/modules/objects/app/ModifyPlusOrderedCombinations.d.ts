import { modify } from '../infrastructure';
import { forceExtract, forceToString } from '../../app';
import { getIndexes } from '../../arrays-and-tuples/infrastructure';
import { forceConcat } from '../../arrays-and-tuples/app';
import { isNever } from '../../never/infrastructure';
import { InternalAdd } from '../../numbers/math/app/addition';
import { InternalBiggerThan } from '../../numbers/math/app/arimetic';
import { TupleReduce, UnionMap } from '../../infrastructure';

interface $CreateGroup<T, maxLenght, Result extends unknown[], lastKey> extends $<[current: unknown]> {
  return: InternalBiggerThan<[lastKey], [this[0]]> extends true
    ? never
    : GetUnionGroupByNumericOrder<Exclude<T, this[0]>, maxLenght, [...Result, this[0]], this[0]>;
}

type GetUnionGroupByNumericOrder<
  T,
  L,
  Result extends unknown[] = [],
  lastKey = 0,
> = `${Result['length']}` extends forceToString<L> ? Result : UnionMap<T, $CreateGroup<T, L, Result, lastKey>>;

type GetAllPosibleGroupsByNumericOrder<
  T,
  current extends number | string = '1',
  lastResult = never,
  newResult = GetUnionGroupByNumericOrder<T, current>
> = isNever<newResult> extends true ? lastResult : GetAllPosibleGroupsByNumericOrder<T, InternalAdd<current, 1>, lastResult | newResult>;

interface $CreateAcumulativeModified<U, K extends PropertyKey> extends $<[acc: unknown, current: unknown]> {
  return: modify<
  this['0'],
  forceExtract<forceExtract<U, this['1']>, 1> & {
    readonly [_ in K]: forceConcat<forceExtract<this['0'], K>, [forceExtract<forceExtract<U, this['1']>, 0>]>
  }>;
}

interface $CreateAllAcumulativeModified<T, U, K extends PropertyKey> extends $<[current: nLengthTuple<string>]> {
  return: TupleReduce<this[0], $CreateAcumulativeModified<U, K>, T & { [_ in K]: [] }>;
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
 * type Result = modifyByKeyPlusOrderedCombinations<{ test: 'test' }, [
 *  ['fet1', { newprop1: 1 }],
 *  ['fet2', { newprop2: 2 }],
 *  ['fet3', { newprop1: 3; newprop3: 3 }],
 * ]>;
 */
export type modifyByKeyPlusOrderedCombinations<
  mainObj,
  overrides extends [string, any][],
  keyToDiscrimitate extends PropertyKey = '__key'
> = (mainObj & { [_ in keyToDiscrimitate]?: undefined })
| UnionMap<
GetAllPosibleGroupsByNumericOrder<getIndexes<overrides>>,
$CreateAllAcumulativeModified<mainObj, overrides, keyToDiscrimitate>
>;
