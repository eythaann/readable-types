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

/**
 * A utility type that substitutes a default type when the provided type is `any`.
 * @example
 * type A = defaultOnAny<any, string>;  // Result: string
 * type B = defaultOnAny<number, string>;  // Result: number
 */
export type defaultOnAny<Type, Default> = isAny<Type> extends true ? Default : Type;