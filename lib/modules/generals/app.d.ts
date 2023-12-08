export * as HKT from './HKT/app';

export type isType<
  TypeToTest,
  TypeToCast,
> = 0 extends (1 & TypeToTest)
  ? false
  : [TypeToTest] extends [never]
    ? false
    : [TypeToTest] extends [TypeToCast] ? true : false;

// @ts-ignore
export type forceExtract<T, Prop> = T[Prop];

// @ts-ignore
export type forceToString<T> = `${T}`;