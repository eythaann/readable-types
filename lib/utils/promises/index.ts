import { If } from '../conditions';
import { IsNever } from '../never';

export type IsPromise<T> = If<IsNever<T>, false, T extends Promise<any> ? true : false>;