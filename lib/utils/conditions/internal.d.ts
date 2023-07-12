
type caseMap = {
  'true': 'type';
  'false': 'else';
  //'boolean': 'type' | 'else';
};

type binaryCaseMap = {
  1: 'type';
  0: 'else';
};

declare namespace internal {
  // TODO improve inference of types for generics
  // @ts-ignore
  type IfObject<Condition> = Condition[caseMap[`${Condition['condition']}`]];

  type IfSingleLine<Condition, T, F = never> = [Condition] extends [true] ? T : F;
}

declare namespace internal.Binary {
  // @ts-ignore
  type If<Condition> = Condition[binaryCaseMap[Condition['condition']]];
}