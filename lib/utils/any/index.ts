
export type IsAny<Type> = (0 & Type) extends 1 ? true : false;
