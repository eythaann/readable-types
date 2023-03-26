import { If } from '../conditions';
import { IsNever } from '../never';

export type IsArray<T> = If<IsNever<T>, false, T extends any[] ? true : false>;

export type IsTuple<T> = If<IsArray<T>, T extends [infer _A, ...(infer _B)] ? true : false, false>;

/** Get a Tuple with the same type of N length */
export type Tuple<Type, Length extends number, _Tuple extends unknown[] = []> = _Tuple['length'] extends Length
  ? _Tuple
  : Tuple<Type, Length, [Type, ..._Tuple]>;
