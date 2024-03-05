import { forceExtract } from '../internals';

type Explicit = {
  condition: boolean;
  then: unknown;
  else: unknown;
};

type Natural = {
  then: unknown;
  else: unknown;
};

export type ExplicitCondition<Condition> = [forceExtract<Condition, 'condition'>] extends [false] ? forceExtract<Condition, 'else'> : forceExtract<Condition, 'then'>;

export type ExtendsCaseMapA = {
  'singleLine': boolean;
  'natural': boolean;
  'explicit': Explicit;
};

export type ExtendsCaseMapB = {
  'singleLine': unknown;
  'natural': Natural;
  'explicit': never;
};

export type ExtendsCaseMapC = {
  'singleLine': unknown;
  'natural': never;
  'explicit': never;
};