
const expect = '\'expect\'';
const expected = '\'expected\'';

export const FailMsgs = {
  equal: `${expect} is equal to ${expected}`,
  notEqual: `${expect} is not equal to ${expected}`,
  isNever: `${expect} is type never`,
  isNotNever: `${expect} is not type never`,
  isNotUndefined: `${expect} is not type undefined`,
  isNotObject: `${expect} is not type object`,
} as const;

export type FailMsgs = typeof FailMsgs;