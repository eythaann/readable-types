/**
 * Evaluates if the specified type is exactly a 'never' type.
 *
 * Case unions will always be false, because "never" in a union resolves to itself but omitting the "never" type.
 *
 * Examples:
 * type A = isNever<never>;
 * //   ^? true
 * type B = isNever<string>;
 * //   ^? false
 * type C = isNever<number | never>;
 * //   ^? false
 */
export type isNever<Type> = [Type] extends [never] ? true : false;
