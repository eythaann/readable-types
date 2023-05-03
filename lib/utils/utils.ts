
/** return all posible value types as a Union type */
export type ValueOf<T> = T[keyof T];

/** Same as keyof but this works with union types */
export type KeysOfUnion<Type> = Type extends Type ? keyof Type : never;

/**
 * Convert union types in one object.
 * Repeated properties will be converted in union, example:
 * ```tsx
 * type T = { p1: string, p2: number } | { p1: number, p3: string };
 * type T2 = UnionToIntersection<T> = {
 *   p1: string | number;
 *   p2: number;
 *   p3: string;
 * };
 * ```
 */
export type UnionToIntersection<Type> = { [Key in KeysOfUnion<Type>]: Extract<Type, { [key in Key]?: any }>[Key] };
