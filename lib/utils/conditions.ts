export type Else<T> = T;

/**
 * @example If<IsNumber<X>, 'NUMBER', Else<'NOT NUMBER'>>
 */
export type If<Condition extends boolean, TrueCase, FalseCase = never> = Condition extends true ? TrueCase : FalseCase;
