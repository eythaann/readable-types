export type Else<T> = T;

/**
 * Conditional type that selects one of two possible types based on a boolean condition.
 *
 * @example
 * ```
 * type A = If<true, string, number>;
 * //   ^ Type A = string
 * type B = If<false, string, number>;
 * //   ^ Type B = number
 * type C = If<boolean, string, number>;
 * //   ^ Type c = string | number
 * ```
 */
export type If<Condition extends boolean, TrueCase, FalseCase = never> = Condition extends true ? TrueCase : FalseCase;
