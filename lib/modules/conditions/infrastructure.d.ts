import { ForceExtract } from '../app';
import { ExplicitCondition, ExtendsCaseMapA, ExtendsCaseMapB, ExtendsCaseMapC } from './app';

type IfMode = ForceExtract<INTERNAL_RT_CONFIG, 'conditionWay'>;
type AType = ExtendsCaseMapA[IfMode];
type BType = ExtendsCaseMapB[IfMode];
type CType = ExtendsCaseMapC[IfMode];

/**
 * Conditional type that selects one of two possible types based on a boolean condition or a condition object.
 * The way as you declare condition can be changed in your global.d.ts file
 *
 * @example
 * 'Single Line'
 * type A = If<true, string, number>;
 * //   ^ Type A = string
 *
 * 'natural'
 * type A = If<true, {
 *  then: string;
 *  else: number;
 * }>;
 *
 * 'explicit'
 * type A = If<{
 *  condition: true;
 *  then: string;
 *  else: number;
 * }>;
 */
export type If<
  A extends AType,
  B extends BType = never,
  C extends CType = never
> = ExplicitCondition<{
  'singleLine': { condition: A; then: B; else: C };
  'natural': { condition: A } & B;
  'explicit': A;
}[IfMode]>;