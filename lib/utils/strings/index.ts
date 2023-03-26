import { If } from '../conditions';
import { IsNever } from '../never';

export type IsString<T> = If<IsNever<T>, false, [T] extends [string] ? true : false>;
