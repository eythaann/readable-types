type _EqualsObject<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type _Equals<
  A,
  B,
  AIsAny extends 0 | 1 = RT_INTERNAL.Binary.IsAny<A>,
  BIsAny extends 0 | 1 = RT_INTERNAL.Binary.IsAny<B>,
> = RT_INTERNAL.Binary.If<{
  condition: RT_INTERNAL.Binary.OR[AIsAny][BIsAny];
  type: RT_INTERNAL.Binary.toBoolean[RT_INTERNAL.Binary.AND[AIsAny][BIsAny]];
  else: RT_INTERNAL.Binary.If<{
    condition: RT_INTERNAL.Binary.AND[RT_INTERNAL.Binary.IsStrictObject<A>][RT_INTERNAL.Binary.IsStrictObject<B>];
    type: _EqualsObject<A, B>;
    else: RT_INTERNAL.Binary.toBoolean[
      RT_INTERNAL.Binary.AND[RT_INTERNAL.Binary.IsSubType<A, B>][RT_INTERNAL.Binary.IsSuperType<A, B>]
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
