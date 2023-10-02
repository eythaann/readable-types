import { ForceExtract } from '../app';
import { ExplicitCondition, ExtendsCaseMapA, ExtendsCaseMapB, ExtendsCaseMapC, NaturalCondition, SingleLineCondition } from './app';

type IfMode = ForceExtract<INTERNAL_RT_CONFIG, 'conditionWay'>;

/*
  ! WARNING: This utility has an internal implementation.
  If you are modifying this method, ensure to also update its corresponding internal implementation.
*/
/**
 * Conditional type that selects one of two possible types based on a boolean condition or a condition object.
 *
 * @example
 * // using boolean condition
 * type A = If<true, string, number>;
 * //   ^ Type A = string
 * type B = If<false, string, number>;
 * //   ^ Type B = number
 * type C = If<boolean, string, number>;
 * //   ^ Type C = string | number
 */
export type If<
  A extends ExtendsCaseMapA[IfMode],
  B extends ExtendsCaseMapB[IfMode] = never,
  C extends ExtendsCaseMapC[IfMode] = never
> = {
  'singleLine': SingleLineCondition<A, B, C>;
  'natural': NaturalCondition<A, B>;
  'explicit': ExplicitCondition<A>;
}[IfMode];