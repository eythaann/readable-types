type recieve = 'Tested <type>';
type expected = '`expected`';

type p = 'is';
type n = 'is not';

type has = 'has';
type hasNot = 'does not have';

type have<T> = T extends true ? has : hasNot;
type be<T> = T extends true ? p : n;

export type FailMsgs<T extends boolean = false> = {
  equal: `${recieve} ${be<T>} equal to ${expected}`;
  supertype: `${recieve} ${be<T>} supertype of ${expected}`;
  subtype: `${recieve} ${be<T>} subtype of ${expected}`;

  truly: `${recieve} ${be<T>} equals to \`true\``;
  falsy: `${recieve} ${be<T>} equals to \`false\``;

  never: `${recieve} ${be<T>} type \`never\``;
  undefined: `${recieve} ${be<T>} type \`undefined\``;
  null: `${recieve} ${be<T>} type \`null\``;
  object: `${recieve} ${be<T>} type \`object\``;
  function: `${recieve} ${be<T>} type \`function\``;
  number: `${recieve} ${be<T>} type \`function\``;
  string: `${recieve} ${be<T>} type \`function\``;
  array: `${recieve} ${be<T>} type \`array\``;
  tuple: `${recieve} ${be<T>} type \`tuple\``;
  any: `${recieve} ${be<T>} type \`any\``;
  unknow: `${recieve} ${be<T>} type \`unknow\``;
  boolean: `${recieve} ${be<T>} type \`boolean\``;
  promise: `${recieve} ${be<T>} type \`promise\``;
  property: `${recieve} ${have<T>} \`property\``;
};