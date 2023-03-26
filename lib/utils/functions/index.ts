import { AnyFunction } from '../../constants';

export type IsFunction<T> = T extends AnyFunction ? true : false;