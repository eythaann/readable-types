import { IsAny } from '../any';
import { And, Or } from '../booleans';

export type Equals<T, U> = Or<[IsAny<T>, IsAny<U>]> extends true
  ? And<[IsAny<T>, IsAny<U>]>
  : [T] extends [U] ? [U] extends [T] ? true : false : false;

/* export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false; */

export type IsSuperType<A, B> = B extends A ? true : false;

export type IsSubType<A, B> = A extends B ? true : false;
