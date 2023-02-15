
const expect = '\'expect\'';
const expected = '\'expected\'';

export const FailMessage = {
  equal: `${expect} is equal to ${expected}`,
  notEqual: `${expect} is not equal to ${expected}`,
  isNever: `${expect} is type never`,
  isNotNever: `${expect} is not type never`,
} as const

export type FailMessage = typeof FailMessage;