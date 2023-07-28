declare namespace RT_INTERNAL.Binary {
  type IsSuperType<A, B> = [B] extends [A] ? 1 : 0;
  type IsSubType<A, B> = [A] extends [B] ? 1 : 0;
}