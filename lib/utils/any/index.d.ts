/**
 * Evaluates if the specified type is `any`.
 * @example
 * type A = IsAny<any>;
 * //   ^? true
 * type B = IsAny<string>;
 * //   ^? false
 * type C = IsAny<number | any>;
 * //   ^? true
 */
/*
  This utility uses a clever trick with TypeScript's type system:
  the expression `(1 & T)` will resolve to `1` if `T` is `any`,
  and to `never` otherwise. Since `0` extends `never` but not `1`,
  `0 extends (1 & T)` will be `true` if `T` is `any` and `false` otherwise.

  ! WARNING: This utility has an internal implementation.
  If you are modifying this method, ensure to also update its corresponding internal implementation.
*/
export type IsAny<T> = 0 extends (1 & T) ? true : false;