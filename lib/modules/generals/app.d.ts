import { isSubtype } from '../infrastructure';

export type isType<
  TypeToTest,
  TypeToCast,
> = 0 extends (1 & TypeToTest)
  ? false
  : [TypeToTest] extends [never]
    ? false
    : isSubtype<TypeToTest, TypeToCast>;

// @ts-ignore
export type forceExtract<T, Prop> = T[Prop];

// @ts-ignore
export type forceToString<T> = `${T}`;