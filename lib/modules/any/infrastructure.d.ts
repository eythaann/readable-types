/**
 * Evaluates if the specified type is `any`.
 * @example
 * type A = isAny<any>;
 * //   ^? true
 * type B = isAny<string>;
 * //   ^? false
 * type C = isAny<number | any>;
 * //   ^? true
 */
/*
  This utility uses a clever trick with TypeScript's type system:
  the expression `(1 & T)` will resolve to `1` if `T` is `any`,
  and to `never` otherwise. Since `0` extends `never` but not `1`,
  `0 extends (1 & T)` will be `true` if `T` is `any` and `false` otherwise.
*/
export type isAny<T> = 0 extends (1 & T) ? true : false;