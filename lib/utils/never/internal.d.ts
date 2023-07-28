declare namespace RT_INTERNAL.Binary {
  type IsNever<Type> = [Type] extends [never] ? 1 : 0;
}