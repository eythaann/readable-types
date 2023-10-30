import { isNever } from '../never/infrastructure';

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
export type isPromise<T> = If<isNever<T>, {
  then: false;
  else: T extends Promise<any> ? true : false;
}>;