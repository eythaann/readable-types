import { isUndefined, isUnknown } from '../infrastructure';

export * from './HKT/infrastructure';
export * from './HKT/domain';

/**
 * Extracts the types of the values of the properties of T.
 *
 * @example
 * type A = ValueOf<{ a: number, b: string }>;
 * //   ^? number | string
 */
export type ValueOf<T> = T[keyof T];

/**
 * Extracts the keys of a union of object types.
 *
 * @example
 * type A = KeysOfUnion<{ a: number, b: string } | { c: boolean }>;
 * //   ^? "a" | "b" | "c"
 */
export type KeysOfUnion<Type> = Type extends Type ? keyof Type : never;

/**
 * Converts a union of object types into a single object type with keys
 * being the union of all keys and values being the union of all values.
 *
 * @example
 * type A = UnionToIntersection<{ a: number, b: string } | { a: string, c: boolean }>;
 * //   ^? { a: number | string, b: string, c: boolean }
 */
export type UnionToIntersection<Type> = { [Key in KeysOfUnion<Type>]: Extract<Type, { [key in Key]?: any }>[Key] };

/**
 * This can be used to assert that a certain type `T` is subtype of another type `U`.
 * util for cast keyof objects in generics as example
 * @example
 * type Result1 = Cast<string, number>;
 * //   ^? Result1 = number
 *
 * type Result2 = Cast<'a', string>;
 * //   ^? Result2 = 'a'
 */
export type Cast<T, U> = T extends U ? T : U;

/**
 * Creates an opaque type, ensuring that values of the base type cannot be
 * directly assigned to the opaque type, and vice versa.
 *
 * An opaque type is a type that wraps around another type (the base type),
 * adding a unique "brand" to differentiate it. This pattern is useful
 * for creating distinct types that are based on the same underlying type.
 *
 * @template BaseType - The underlying type of the opaque type.
 * @template BrandType - A unique brand to differentiate the opaque type from its base type.
 *
 * @example
 * type UserID = Opaque<number, 'UserID'>;
 * const userId: UserID = 123 as UserID;
 * const notUserId: number = 123;
 * // Direct assignment without casting would result in a type error:
 * // const anotherUserId: UserID = 456; // Error
 */
export type Opaque<BaseType, BrandType = unknown> = (BaseType & {
  readonly [_ in typeof Brand]: BrandType;
}) | {
  readonly [_ in typeof Brand]: BrandType;
};

/**
 * Creates an brand type, ensuring that values of the base type cannot be
 * directly assigned to the opaque type, but itseft is asignable to its base type.
 */
export type WeakOpaque<BaseType, BrandType = unknown> = BaseType & {
  readonly [_ in typeof Brand]: BrandType;
};

declare const Brand: unique symbol;

/**
 * Allow avoid infer on generics when you predifine a type on other context.
 *
 * Normally this is usefull on advanced generics functions.
 */
export type NoInfer<T> = [T][T extends any ? 0 : never];

/**
 * A utility type that substitutes a default type when the provided type is unknown | undefined.
 * @example
 * type A = Default<unknown, string>;  // Result: string
 * type B = Default<number, string>;  // Result: number
 * type C = Default<undefined, string>;  // Result: string
 */
export type Default<Type, Default> = isUnknown<Type> extends true ? Default : isUndefined<Type> extends true ? Default : Type;