import { ForceExtract } from '../app';

type Explicit = {
  condition: boolean;
  then: unknown;
  else: unknown;
};

type Natural = {
  then: unknown;
  else: unknown;
};

export type ExplicitCondition<Condition> = [ForceExtract<Condition, 'condition'>] extends [false] ? ForceExtract<Condition, 'else'> : ForceExtract<Condition, 'then'>;

export type NaturalCondition<Condition, Obj> = [Condition] extends [false] ? ForceExtract<Obj, 'else'> : ForceExtract<Obj, 'then'>;

export type SingleLineCondition<Condition, T, F = never> = [Condition] extends [false] ? F : T;

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