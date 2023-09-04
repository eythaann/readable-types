import { Equals, IsSubType, IsSuperType } from '.';

describeType('Equals', () => {
  testType('Basic Cases', [
    assertType<Equals<string, string>>().toBeTrue(),
    assertType<Equals<number, number>>().toBeTrue(),
    assertType<Equals<boolean, boolean>>().toBeTrue(),
    assertType<Equals<undefined, undefined>>().toBeTrue(),
    assertType<Equals<null, null>>().toBeTrue(),
    assertType<Equals<symbol, symbol>>().toBeTrue(),
    assertType<Equals<any, any>>().toBeTrue(),
    assertType<Equals<unknown, unknown>>().toBeTrue(),
    assertType<Equals<never, never>>().toBeTrue(),
    assertType<Equals<{ a: number }, { a: number }>>().toBeTrue(),
    assertType<Equals<[], []>>().toBeTrue(),
    assertType<Equals<[number, string], [number, string]>>().toBeTrue(),
    assertType<Equals<() => void, () => void>>().toBeTrue(),
    assertType<Equals<1 | number & {}, number>>().toBeTrue(),

    assertType<Equals<string, number>>().toBeFalse(),
    assertType<Equals<number, boolean>>().toBeFalse(),
    assertType<Equals<boolean, undefined>>().toBeFalse(),
    assertType<Equals<undefined, null>>().toBeFalse(),
    assertType<Equals<null, symbol>>().toBeFalse(),
    assertType<Equals<symbol, any>>().toBeFalse(),
    assertType<Equals<any, unknown>>().toBeFalse(),
    assertType<Equals<unknown, never>>().toBeFalse(),
    assertType<Equals<never, string>>().toBeFalse(),
    assertType<Equals<'', string>>().toBeFalse(),
    assertType<Equals<0, number>>().toBeFalse(),
    assertType<Equals<{ a: number }, { a: string }>>().toBeFalse(),
    assertType<Equals<[], [number]>>().toBeFalse(),
    assertType<Equals<[number, string], [string, number]>>().toBeFalse(),
    assertType<Equals<() => void, (arg: number) => void>>().toBeFalse(),
  ]);

  testType('Any', [
    assertType<Equals<any, string>>().toBeFalse(),
    assertType<Equals<any, number>>().toBeFalse(),
    assertType<Equals<any, boolean>>().toBeFalse(),
    assertType<Equals<any, undefined>>().toBeFalse(),
    assertType<Equals<any, null>>().toBeFalse(),
    assertType<Equals<any, symbol>>().toBeFalse(),
    assertType<Equals<any, { a: number }>>().toBeFalse(),
    assertType<Equals<any, []>>().toBeFalse(),
    assertType<Equals<any, [number, string]>>().toBeFalse(),
    assertType<Equals<any, () => void>>().toBeFalse(),
    assertType<Equals<never, any>>().toBeFalse(),
    assertType<Equals<unknown, any>>().toBeFalse(),
    assertType<Equals<any, never>>().toBeFalse(),
    assertType<Equals<any, unknown>>().toBeFalse(),
  ]);

  testType('Unknown', [
    assertType<Equals<unknown, string>>().toBeFalse(),
    assertType<Equals<unknown, number>>().toBeFalse(),
    assertType<Equals<unknown, boolean>>().toBeFalse(),
    assertType<Equals<unknown, undefined>>().toBeFalse(),
    assertType<Equals<unknown, null>>().toBeFalse(),
    assertType<Equals<unknown, symbol>>().toBeFalse(),
    assertType<Equals<unknown, { a: number }>>().toBeFalse(),
    assertType<Equals<unknown, []>>().toBeFalse(),
    assertType<Equals<unknown, [number, string]>>().toBeFalse(),
    assertType<Equals<unknown, () => void>>().toBeFalse(),
  ]);

  testType('Never', [
    assertType<Equals<never, string>>().toBeFalse(),
    assertType<Equals<never, number>>().toBeFalse(),
    assertType<Equals<never, boolean>>().toBeFalse(),
    assertType<Equals<never, undefined>>().toBeFalse(),
    assertType<Equals<never, null>>().toBeFalse(),
    assertType<Equals<never, symbol>>().toBeFalse(),
    assertType<Equals<never, { a: number }>>().toBeFalse(),
    assertType<Equals<never, []>>().toBeFalse(),
    assertType<Equals<never, [number, string]>>().toBeFalse(),
    assertType<Equals<never, () => void>>().toBeFalse(),

  ]);

  testType('Should be false if are the same union type', [
    assertType<Equals<string | number, string | number>>().toBeTrue(),
    assertType<Equals<1 | 2 | 3, 1 | 2 | 3>>().toBeTrue(),
    assertType<Equals<'a' | 'b', 'a' | 'b'>>().toBeTrue(),
  ]);

  testType('Should not import the order in Union types', [
    assertType<Equals<string | number, number | string>>().toBeTrue(),
    assertType<Equals<1 | 2 | 3, 3 | 2 | 1>>().toBeTrue(),
    assertType<Equals<'a' | 'b', 'b' | 'a'>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same union type', [
    assertType<Equals<1 | 2 | 3, 1 | 2>>().toBeFalse(),
    assertType<Equals<1 | 2, 1 | 2 | 3>>().toBeFalse(),
    assertType<Equals<string | number, string>>().toBeFalse(),
    assertType<Equals<string | number, number>>().toBeFalse(),
    assertType<Equals<string, string | number>>().toBeFalse(),
    assertType<Equals<number, string | number>>().toBeFalse(),
    // union types and any type
    assertType<Equals<string | number, any>>().toBeFalse(),
    assertType<Equals<any, string | number>>().toBeFalse(),
    // union types and unknown type
    assertType<Equals<string | number, unknown>>().toBeFalse(),
    assertType<Equals<unknown, string | number>>().toBeFalse(),
    // union types and never type
    assertType<Equals<string | number, never>>().toBeFalse(),
    assertType<Equals<never, string | number>>().toBeFalse(),
  ]);

  testType('Should not import the order in Union types', [
    assertType<Equals<string | number, number | string>>().toBeTrue(),
    assertType<Equals<1 | 2 | 3, 3 | 2 | 1>>().toBeTrue(),
    assertType<Equals<'a' | 'b', 'b' | 'a'>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same tuple', [
    assertType<Equals<[string | number], [string]>>().toBeFalse(),
    assertType<Equals<[number, string, number], [string, number, number]>>().toBeFalse(),
  ]);

  testType('Should be false if are not the same union tuple', [
    assertType<Equals<[string] | [number], [string]>>().toBeFalse(),
    assertType<Equals<[string] | [number], [number] | [string] | []>>().toBeFalse(),
    assertType<Equals<[string | number] | ['123'], [string]>>().toBeFalse(),
  ]);

  testType('Should be true if are the same union tuple', [
    assertType<Equals<[string] | [number], [number] | [string]>>().toBeTrue(),
    assertType<Equals<[string | number] | [1 | 2], [string | number]>>().toBeTrue(),
    assertType<Equals<[string] | ['123'], [string]>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same object', [
    assertType<Equals<{ prop1: string }, { prop1?: string }>>().toBeFalse(),
    assertType<Equals<{ prop1?: string }, { prop1: string }>>().toBeFalse(),
    assertType<Equals<{ prop1: string }, { readonly prop1: string }>>().toBeFalse(),
    assertType<Equals<{ readonly prop1: string }, { prop1: string }>>().toBeFalse(),

    assertType<Equals<{ prop1?: undefined }, { prop1: undefined }>>().toBeFalse(),
    assertType<Equals<{ prop1: string } | number, { prop1?: string }>>().toBeFalse(),
    assertType<Equals<{ prop1: string } | { prop1: number }, { prop1?: string } | { prop1?: number }>>().toBeFalse(),
    assertType<Equals<{ prop1?: undefined } | { prop1?: '1' }, { prop1: undefined } | { prop1: '1' }>>().toBeFalse(),
    assertType<Equals<{ prop1?: string } | { prop1?: number }, { prop1?: string } | { readonly prop1?: number }>>().toBeFalse(),
  ]);

  testType('Should be true if are the same object', [
    assertType<Equals<{ prop1: string }, { prop1: string }>>().toBeTrue(),
    assertType<Equals<{ prop1?: string }, { prop1?: string }>>().toBeTrue(),
    assertType<Equals<{ readonly prop1: string }, { readonly prop1: string }>>().toBeTrue(),
    assertType<Equals<{ readonly prop1?: string }, { readonly prop1?: string }>>().toBeTrue(),
    assertType<Equals<{ prop1?: undefined }, { prop1?: undefined }>>().toBeTrue(),
    assertType<Equals<{ prop1?: string } | { readonly prop1?: number }, { prop1?: string } | { readonly prop1?: number }>>().toBeTrue(),
    assertType<Equals<Record<'x', 'x'>, { x: 'x' }>>().toBeTrue(),
  ]);

  testType('functions', () => {
    type expected = Equals<
    {
      (x: 0, y: null): void;
      (x: number, y: null): void;
    },
    {
      (x: number, y: null): void;
      (x: 0, y: null): void;
    }
    >;
    return assertType<expected>().toBeTrue();
  });
});

describeType('IsSuperType', () => {
  testType('Should return true if A is a supertype of B', [
    assertType<IsSuperType<string | number, string>>().toBeTrue(),
    assertType<IsSuperType<number | string, number>>().toBeTrue(),
    assertType<IsSuperType<any, never>>().toBeTrue(), // "any" is supertype of any type.
    assertType<IsSuperType<any, any>>().toBeTrue(), // "any" is supertype of itself.
    assertType<IsSuperType<unknown, any>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<IsSuperType<unknown, never>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<IsSuperType<unknown, string>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<IsSuperType<{ a: number }, { a: number; b: string }>>().toBeTrue(),
    assertType<IsSuperType<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().toBeTrue(),
  ]);

  testType('Should return false if A is not a supertype of B', [
    assertType<IsSuperType<string, string | number>>().toBeFalse(),
    assertType<IsSuperType<number, number | string>>().toBeFalse(),
    assertType<IsSuperType<never, any>>().toBeFalse(), // "never" is not supertype of any type.
    assertType<IsSuperType<{ a: number; b: string }, { a: number }>>().toBeFalse(),
    assertType<IsSuperType<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().toBeFalse(),
  ]);
});

describeType('IsSubType', () => {
  testType('Should return true if A is a subtype of B', [
    assertType<IsSubType<string, string | number>>().toBeTrue(),
    assertType<IsSubType<number, number | string>>().toBeTrue(),
    assertType<IsSubType<never, any>>().toBeTrue(), // any type is subtype of any type.
    assertType<IsSubType<any, any>>().toBeTrue(), // "any" is subtype of itself.
    assertType<IsSubType<unknown, any>>().toBeTrue(), // "unknown" is subtype of "any" type.
    assertType<IsSubType<string, unknown>>().toBeTrue(), // any type is subtype of "unknown" type.
    assertType<IsSubType<never, unknown>>().toBeTrue(), // any type is subtype of "unknown" type.
    assertType<IsSubType<{ a: number; b: string }, { a: number }>>().toBeTrue(),
    assertType<IsSubType<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().toBeTrue(),
  ]);

  testType('Should return false if A is not a subtype of B', [
    assertType<IsSubType<string | number, string>>().toBeFalse(),
    assertType<IsSubType<number | string, number>>().toBeFalse(),
    assertType<IsSubType<any, never>>().toBeFalse(), // "any" is not subtype of "never"
    assertType<IsSubType<unknown, string>>().toBeFalse(), // "unknown" is not subtype of any type except itself and "any".
    assertType<IsSubType<{ a: number }, { a: number; b: string }>>().toBeFalse(),
    assertType<IsSubType<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().toBeFalse(),
  ]);
});