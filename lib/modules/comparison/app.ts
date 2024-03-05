import { prettify } from '..';

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
    : [T] extends [unknownObject]
      ? 1
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

export type _EqualsObject<_A, _B, A = prettify<_A>, B = prettify<_B>> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

export type _Equals<
  A,
  B,
  AIsAny extends 0 | 1 = IsAny<A>,
  BIsAny extends 0 | 1 = IsAny<B>,
> = If<{
  condition: OR[AIsAny][BIsAny];
  type: toBoolean[AND[AIsAny][BIsAny]];
  else: If<{
    condition: AND[IsStrictObject<A>][IsStrictObject<B>];
    type: _EqualsObject<A, B>;
    else: toBoolean[
      AND[IsSubTypeBinary<A, B>][IsSuperTypeBinary<A, B>]
    ];
  }>;
}>;