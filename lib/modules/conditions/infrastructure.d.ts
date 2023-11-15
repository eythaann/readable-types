import { INTERNAL_RT_CONFIG } from '../shared/config';
import { ExplicitCondition, ExtendsCaseMapA, ExtendsCaseMapB, ExtendsCaseMapC } from './app';

type IfMode = INTERNAL_RT_CONFIG['conditionWay'];
type AType = ExtendsCaseMapA[IfMode];
type BType = ExtendsCaseMapB[IfMode];
type CType = ExtendsCaseMapC[IfMode];

interface Explicit<Condition, Then, Else> {
  condition: Condition;
  then: Then;
  else: Else;
}

interface Modes<A, B, C> {
  'singleLine': Explicit<A, B, C>;
  // @ts-ignore
  'natural': Explicit<A, B['then'], B['else']>;
  // @ts-ignore
  'explicit': Explicit<A['condition'], A['then'], A['else']>;
}

declare global {
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
  type If<
    A extends AType,
    B extends BType = never,
    C extends CType = never
  > = ExplicitCondition<Modes<A, B, C>[IfMode]>;
}