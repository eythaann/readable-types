import { AnyFunction } from '../functions';
import { AnyObject } from './types';

declare global {
  namespace _RT.Binary {
    type IsStrictObject<T> = IsAny<T> extends 1
      ? 0
      : IsNever<T> extends 1
        ? 0
        : IsUnknown<T> extends 1
          ? 0
          : T extends AnyObject
            ? T extends AnyFunction
              ? 0
              : T extends any[]
                ? 0
                : 1
            : 0;
  }

  namespace _RT {
    // @ts-ignore
    type ForceExtract<T, Prop> = T[Prop];
  }
}