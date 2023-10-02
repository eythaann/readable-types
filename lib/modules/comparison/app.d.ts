import { AnyFunction } from '../functions/infrastructure';
import { AnyObject } from '../objects/infrastructure';

export type binaryMap<T> = {
  1: false;
  0: unknown extends T ? true : false;
};

type binaryCaseMap = {
  1: 'type';
  0: 'else';
};

export type IsSuperTypeBinary<A, B> = [B] extends [A] ? 1 : 0;

export type IsSubTypeBinary<A, B> = [A] extends [B] ? 1 : 0;

export type IsAny<T> = 0 extends (1 & T) ? 1 : 0;

export type IsNever<Type> = [Type] extends [never] ? 1 : 0;

export type IsUnknown<T> = binaryMap<T>[IsAny<T>];

// @ts-ignore
export type If<Condition> = Condition[binaryCaseMap[Condition['condition']]];

export type IsStrictObject<T> = IsAny<T> extends 1
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

export interface XOR {
  0: {
    1: 1;
    0: 0;
  };
  1: {
    1: 0;
    0: 1;
  };
}

export interface AND {
  0: {
    1: 0;
    0: 0;
  };
  1: {
    1: 1;
    0: 0;
  };
}

export interface OR {
  0: {
    1: 1;
    0: 0;
  };
  1: {
    1: 1;
    0: 1;
  };
}

export interface toBoolean {
  0: false;
  1: true;
}