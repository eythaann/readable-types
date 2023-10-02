import { If } from '../conditions/infrastructure';
import { IsNever } from '../never/infrastructure';

/**
 * Evaluates if the specified type is a Promise.
 *
 * @example
 *
 * type A = IsPromise<Promise<number>>;
 * //   ^? true
 * type B = IsPromise<string>;
 * //   ^? false
 * type C = IsPromise<never>;
 * //   ^? false
 */
export type IsPromise<T> = If<IsNever<T>, false, T extends Promise<any> ? true : false>;