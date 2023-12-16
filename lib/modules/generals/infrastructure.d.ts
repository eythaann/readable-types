import { isNull, isUndefined, isUnknown } from '../infrastructure';

export * from './HKT/infrastructure';
export * from './newtypes/infrastructure';

/**
 * Extracts the types of the values of the properties of T.
 *
 * @example
 * type A = valueof<{ a: number, b: string }>;
 * //   ^? number | string
 */
export type valueof<T> = T[keyof T];

/**
 * Improved `keyof` to support unions

 * @example
 * type A = $keyof<{ a: number, b: string } | { c: boolean }>;
 * //   ^? "a" | "b" | "c"
 */
export type $keyof<Type> = [Type] extends [never]
  ? keyof Type // PropertyKey on `any` and `never`
  : Type extends Type ? keyof Type : never;

/**
 * Converts a union of object types into a single object type with keys
 * being the union of all keys and values being the union of all values.
 *
 * @example
 * type A = unionToIntersection<{ a: number, b: string } | { a: string, c: boolean }>;
 * //   ^? { a: number | string, b: string, c: boolean }
 */
export type unionToIntersection<Type extends unknownObject> = { [Key in $keyof<Type>]: Extract<Type, { [key in Key]?: any }>[Key] };

/**
 * This can be used to assert that a certain type `T` is subtype of another type `U`.
 * util for cast keyof objects in generics as example
 * @example
 * type Result1 = cast<string, number>;
 * //   ^? Result1 = number
 *
 * type Result2 = cast<'a', string>;
 * //   ^? Result2 = 'a'
 */
export type cast<T, U> = T extends U ? T : U;

/**
 * Allow avoid infer on generics when you predifine a type on other context.
 *
 * Normally this is usefull on advanced generics functions.
 */
export type noInfer<T> = [T][T extends any ? 0 : never];

/**
 * A utility type that substitutes a default type when the provided type is `unknown`, `undefined` or `null`.
 * @example
 * type A = defaultOnNullable<unknown, string>;  // Result: string
 * type B = defaultOnNullable<null, string>;  // Result: string
 * type C = defaultOnNullable<undefined, string>;  // Result: string
 * type D = defaultOnNullable<number, string>;  // Result: number
 */
export type defaultOnNullable<Type, Default> = $if<isUnknown<Type> | isUndefined<Type> | isNull<Type>, {
  then: Default;
  else: Type;
}>;