export type If<Condition extends boolean, TrueCase, FalseCase = never> = Condition extends true ? TrueCase : FalseCase;
