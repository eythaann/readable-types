
export type IsUndefined<Type> = [Type] extends [undefined] ? true : false;

export type IsNull<Type> = [Type] extends [null] ? true : false;
