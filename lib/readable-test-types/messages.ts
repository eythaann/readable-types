
type expect = '\'expect\'';
type expected = '\'expected\'';

type p = 'is';
type n = 'is not';

type neg<T> = T extends true ? p : n;

export type FailMsgs<T extends boolean = false> = {
  equal: `${expect} ${neg<T>} equal to ${expected}`;
  never: `${expect} ${neg<T>} type never`;
  undefined: `${expect} ${neg<T>} type undefined`;
  null: `${expect} ${neg<T>} type null`;
  object: `${expect} ${neg<T>} type object`;
};
