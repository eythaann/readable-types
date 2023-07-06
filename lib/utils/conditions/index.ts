
type Condition1 = { 
  condition: boolean;
  type: unknown;
  elseType: unknown;
}

type Condition2 = {
  condition: boolean;
  trueType: unknown;
  falseType: unknown;
}


/**
 * Conditional type that selects one of two possible types based on a boolean condition or a condition object.
 *
 * @example
 * ```
 * // using boolean condition
 * type A = If<true, string, number>;
 * //   ^ Type A = string
 * type B = If<false, string, number>;
 * //   ^ Type B = number
 * type C = If<boolean, string, number>;
 * //   ^ Type C = string | number
 *
 * // using condition object (variant 1)
 * type D = If<{condition: true, type: string, elseType: number}>;
 * //   ^ Type D = string
 * type E = If<{condition: false, type: string, elseType: number}>;
 * //   ^ Type E = number
 *
 * // using condition object (variant 2)
 * type F = If<{condition: true, trueType: string, falseType: number}>;
 * //   ^ Type F = string
 * type G = If<{condition: false, trueType: string, falseType: number}>;
 * //   ^ Type G = number
 * ```
 */
export type If<Condition extends boolean | Condition1 | Condition2, TrueCase = never, FalseCase = never> = 
Condition extends boolean ? Condition extends true ? TrueCase : FalseCase
: Condition extends Condition1 ? Condition['condition'] extends true ? Condition['type'] : Condition['elseType']
: Condition extends Condition2 ? Condition['condition'] extends true ? Condition['trueType'] : Condition['falseType'] : never
