import { IsSubType } from '../infrastructure';

export type IsType<
  TypeToTest,
  TypeToCast,
> = 0 extends (1 & TypeToTest)
  ? false
  : [TypeToTest] extends [never]
    ? false
    : IsSubType<TypeToTest, TypeToCast>;

// @ts-ignore
export type ForceExtract<T, Prop> = T[Prop];

// @ts-ignore
export type ForceToString<T, Prefix = ''> = `${Prefix}${T}`;