
type Condition1 = {
  condition: boolean;
  type: unknown;
  else: unknown;
};

/**
 * Conditional type that selects one of two possible types based on a boolean condition or a condition object.
 *
 * @example
 * // using boolean condition
 * type A = If<true, string, number>;
 * //   ^ Type A = string
 * type B = If<false, string, number>;
 * //   ^ Type B = number
 * type C = If<boolean, string, number>;
 * //   ^ Type C = string | number
 */
/*
  ! WARNING: This utility has an internal implementation.
  If you are modifying this method, ensure to also update its corresponding internal implementation.
*/
export type If<
  Condition extends boolean | Condition1,
  TrueCase = never,
  FalseCase = never
> = Condition extends boolean ? RT_INTERNAL.IfSingleLine<Condition, TrueCase, FalseCase> : RT_INTERNAL.IfObject<Condition>;
