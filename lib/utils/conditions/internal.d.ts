
type caseMap = {
  'true': 'type';
  'false': 'else';
  'boolean': 'type' | 'else';
};

type binaryCaseMap = {
  1: 'type';
  0: 'else';
};

declare namespace internal {
  // @ts-ignore
  type IfObject<Condition> = Condition[caseMap[`${Condition['condition']}`]];

  type IfSingleLine<Condition, T, F> = [Condition] extends [true] ? T : F;
}

declare namespace internal.Binary {
  // @ts-ignore
  type If<Condition> = Condition[binaryCaseMap[Condition['condition']]];
}