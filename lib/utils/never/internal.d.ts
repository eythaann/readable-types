declare namespace _RT.Binary {
  type IsNever<Type> = [Type] extends [never] ? 1 : 0;
}