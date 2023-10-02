import { _RT } from '../..';
import { Prettify } from '../objects/infrastructure';
import { AND, If, IsAny, IsStrictObject, IsSubTypeBinary, IsSuperTypeBinary, OR, toBoolean } from './app';

type _EqualsObject<_A, _B, A = Prettify<_A>, B = Prettify<_B>> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

type _Equals<
  A,
  B,
  AIsAny extends 0 | 1 = IsAny<A>,
  BIsAny extends 0 | 1 = IsAny<B>,
> = If<{
  condition: OR[AIsAny][BIsAny];
  type: toBoolean[AND[AIsAny][BIsAny]];
  else: If<{
    condition: AND[IsStrictObject<A>][IsStrictObject<B>];
    type: _EqualsObject<A, B>;
    else: toBoolean[
      AND[IsSubTypeBinary<A, B>][IsSuperTypeBinary<A, B>]
    ];
  }>;
}>;

/**
 * Determines if two types are equal.
 *
 * @examples
 * type A = Equals<string, string>;
 * //   ^? true
 * type B = Equals<string, number>;
 * //   ^? false
 * type C = Equals<any, string>;
 * //   ^? false
 * type D = Equals<any, any>;
 * //   ^? true
 */
export type Equals<A, B> = _Equals<A, B>;

/**
 * Determines if type A is a supertype of type B.
 *
 * @example
 * type A = IsSuperType<number | string, string>;
 * //   ^? true
 * type B = IsSuperType<string, number | string>;
 * //   ^? false
 */
export type IsSuperType<A, B> = [B] extends [A] ? true : false;

/**
 * Determines if type A is a subtype of type B.
 *
 * @example
 * type A = IsSubType<string, number | string>;
 * //   ^? true
 * type B = IsSubType<number | string, string>;
 * //   ^? false
 */
export type IsSubType<A, B> = [A] extends [B] ? true : false;
