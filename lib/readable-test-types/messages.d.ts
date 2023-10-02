type expect = 'Tested type';
type expected = '\'expected\'';

type p = 'is';
type n = 'is not';

type has = 'has';
type hasNot = 'does not have';

type have<T> = T extends true ? has : hasNot;
type be<T> = T extends true ? p : n;

export type FailMsgs<T extends boolean = false> = {
  equal: `${expect} ${be<T>} equal to ${expected}`;
  supertype: `${expect} ${be<T>} supertype of ${expected}`;
  subtype: `${expect} ${be<T>} subtype of ${expected}`;

  truly: `${expect} ${be<T>} equals to true`;
  falsy: `${expect} ${be<T>} equals to false`;

  never: `${expect} ${be<T>} type never`;
  undefined: `${expect} ${be<T>} type undefined`;
  null: `${expect} ${be<T>} type null`;
  object: `${expect} ${be<T>} type object`;
  function: `${expect} ${be<T>} type function`;
  number: `${expect} ${be<T>} type function`;
  string: `${expect} ${be<T>} type function`;
  array: `${expect} ${be<T>} type array`;
  tuple: `${expect} ${be<T>} type tuple`;
  any: `${expect} ${be<T>} type any`;
  unknow: `${expect} ${be<T>} type unknow`;
  boolean: `${expect} ${be<T>} type boolean`;
  promise: `${expect} ${be<T>} type promise`;
  property: `${expect} ${have<T>} property`;
};