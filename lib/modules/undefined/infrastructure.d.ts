import { isType } from '../app';

/**
 * Evaluates if the specified type is `undefined`.
 * @example
 * type A = isUndefined<undefined>;
 * //   ^? true
 * type B = isUndefined<number>;
 * //   ^? false
 * type C = isUndefined<number | undefined>;
 * //   ^? false
 */
export type isUndefined<T> = isType<T, undefined>;

/**
 * Evaluates if the specified type is `null`.
 * @example
 * type A = IsNull<null>;
 * //   ^? true
 * type B = IsNull<number>;
 * //   ^? false
 * type C = IsNull<number | null>;
 * //   ^? false
 */
export type isNull<T> = isType<T, null>;

/** remove undefined from type */
export type nonUndefined<T> = T extends undefined ? never : T;

/** remove null from type */
export type nonNull<T> = T extends null ? never : T;

/**
 * A utility type that substitutes a default type when the provided type is undefined.
 * @example
 * type A = defaultOnUndefined<undefined, string>;  // Result: string
 * type B = defaultOnUndefined<number, string>;  // Result: number
 */
export type defaultOnUndefined<Type, Default> = isUndefined<Type> extends true ? Default : Type;