
type binaryCaseMap = {
  1: 'type';
  0: 'else';
};

declare namespace RT_INTERNAL {
  type ConditionObject = {
    condition: boolean;
    type: unknown;
    else: unknown;
  };

  type ConditionCaseMap = {
    'true': 'type';
    'false': 'else';
    'boolean': 'type' | 'else';
  };

  // TODO improve inference of types for generics
  type IfObject<Condition extends ConditionObject> = Condition[ConditionCaseMap[`${Condition['condition']}`]];

  type IfSingleLine<Condition, T, F = never> = [Condition] extends [true] ? T : F;
}

declare namespace RT_INTERNAL.Binary {
  // @ts-ignore
  type If<Condition> = Condition[binaryCaseMap[Condition['condition']]];
}