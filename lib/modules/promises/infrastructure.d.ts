import { isNever } from '../never/infrastructure';

/**
 * Evaluates if the specified type is a Promise.
 *
 * @example
 *
 * type A = isPromise<Promise<number>>;
 * //   ^? true
 * type B = isPromise<string>;
 * //   ^? false
 * type C = isPromise<never>;
 * //   ^? false
 */
export type isPromise<T> = If<isNever<T>, {
  then: false;
  else: T extends Promise<any> ? true : false;
}>;