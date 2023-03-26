import { If } from '../conditions';
import { IsNever } from '../never';

export type IsNumber<T> = If<IsNever<T>, false, [T] extends [number] ? true : false>;
