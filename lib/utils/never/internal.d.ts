declare namespace internal.Binary {
  type IsNever<Type> = [Type] extends [never] ? 1 : 0;
}