/**
 * Evaluates if the specified type is exactly a 'never' type.
 *
 * Case unions will always be false, because "never" in a union resolves to itself but omitting the "never" type.
 *
 * Examples:
 * type A = IsNever<never>;
 * //   ^? true
 * type B = IsNever<string>;
 * //   ^? false
 * type C = IsNever<number | never>;
 * //   ^? false
 */
/*
  ! WARNING: This utility has an internal implementation.
  If you are modifying this method, ensure to also update its corresponding internal implementation.
*/
export type IsNever<Type> = [Type] extends [never] ? true : false;
