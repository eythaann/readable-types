import { IsType } from '../app';

/**
 * Evaluates if the specified type is `undefined`.
 * @example
 * type A = IsUndefined<undefined>;
 * //   ^? true
 * type B = IsUndefined<number>;
 * //   ^? false
 * type C = IsUndefined<number | undefined>;
 * //   ^? false
 */
export type IsUndefined<T> = IsType<T, undefined>;

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
export type IsNull<T> = IsType<T, null>;

/** remove undefined from type */
export type NonUndefined<T> = T extends undefined ? never : T;

/** remove null from type */
export type NonNull<T> = T extends null ? never : T;
