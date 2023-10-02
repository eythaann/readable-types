
export type ConditionObject = {
  condition: boolean;
  type: unknown;
  else: unknown;
};

export type ConditionCaseMap = {
  'true': 'type';
  'false': 'else';
  'boolean': 'type' | 'else';
};

// TODO improve inference of types for generics
export type IfObject<Condition extends ConditionObject> = Condition[ConditionCaseMap[`${Condition['condition']}`]];

export type IfSingleLine<Condition, T, F = never> = [Condition] extends [true] ? T : F;

