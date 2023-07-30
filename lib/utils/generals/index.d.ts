
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