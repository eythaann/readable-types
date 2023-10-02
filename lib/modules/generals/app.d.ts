import { IsAny } from '../any';
import { IsNever } from '../never';

export type IsType<
  TypeToTest,
  TypeToCast,
> = IsAny<TypeToTest> extends true
  ? false
  : IsNever<TypeToTest> extends true
    ? false
    : [TypeToTest] extends [TypeToCast] ? true : false;

// @ts-ignore
export type ForceExtract<T, Prop> = T[Prop];

// @ts-ignore
export type ForceToString<T, Prefix = ''> = `${Prefix}${T}`;