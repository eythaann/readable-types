import { And, Or } from './booleans';

/** alias for And type */
export type AllAreTrue<T extends boolean[]> = And<T>;

type Result = And<[]>;
type Result2 = Or<[]>;

type isNumber<T> = T extends number ? true : false;
type _areNumbers<T extends unknown[]> = { [K in keyof T]: isNumber<T[K]> };
type areNumbers<T extends unknown[]> = And<_areNumbers<T>>;
type someIsNumber<T extends unknown[]> = Or<_areNumbers<T>>;

type test = areNumbers<[0, number, string]>;

/** syntax for utility types: util<[...params]>, generic types now are only generic<Type, Type2, ...> */