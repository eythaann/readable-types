import { startsWith } from '../../modules';
import { forceToString } from '../../modules/internals';

import { strToNumber } from '../numbers/infrastructure';

import { InternalAdd } from '../math/app/addition';
import { InternalSubstract } from '../math/app/sustraction';

export type __beta__At<T extends unknown[], I extends number> = T[startsWith<`${I}`, '-'> extends true
  ? InternalSubstract<T['length'], `${I}` extends `${infer _}${infer num}` ? strToNumber<num> : never>
  : I
];

/**
 * Converts properties numbers of an object to a tuple.

 * @example
 * type a = ObjectToTuple<{ 0: string; 1: number; }>
 * //   ^? [string, number]
 */
export type ObjectToTuple<T extends anyObject, currentIndex extends number = 0> = `${currentIndex}` extends forceToString<keyof T>
  ? [T[currentIndex], ...ObjectToTuple<T, InternalAdd<currentIndex, 1>>]
  : [];