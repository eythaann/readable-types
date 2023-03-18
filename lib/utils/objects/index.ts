import { AnyFunction, AnyObject } from '../../constants';
import { IsAny } from '../any';
import { IsNever } from '../never';
import { IsUnknown } from '../unknow';

/**
 * Return true if type is of type object array or function
 * if you are searching for only object use IsStrictObject instead.
*/
export type IsObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : T extends AnyObject ? true
      : false;

/**
 * Return true if type is of type object ignoring arrays.
*/
export type IsStrictObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
    : IsUnknown<T> extends true ? false
      : T extends AnyObject ? T extends AnyFunction ? false : T extends any[] ? false : true
        : false;

/**
 * Allow modify interfaces or object types without the restrictions of use extends or & operator
 */
export type Modify<T, U> = IsStrictObject<T> extends true
  ? IsStrictObject<U> extends true
    ? Omit<T, keyof U> & U
    : T
  : T;