import { AnyFunction, AnyObject } from '../../constants';

declare global {
  namespace RT_INTERNAL.Binary {
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

  namespace RT_INTERNAL {
    // @ts-ignore
    type ForceExtract<T, Prop> = T[Prop];
  }
}