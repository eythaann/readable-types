import { equals, isSubtype, isSupertype } from './infrastructure';

describeType('Equals', () => {
  testType('Basic Cases', [
    assertType<equals<string, string>>().toBeTrue(),
    assertType<equals<number, number>>().toBeTrue(),
    assertType<equals<boolean, boolean>>().toBeTrue(),
    assertType<equals<undefined, undefined>>().toBeTrue(),
    assertType<equals<null, null>>().toBeTrue(),
    assertType<equals<symbol, symbol>>().toBeTrue(),
    assertType<equals<any, any>>().toBeTrue(),
    assertType<equals<unknown, unknown>>().toBeTrue(),
    assertType<equals<never, never>>().toBeTrue(),
    assertType<equals<{ a: number }, { a: number }>>().toBeTrue(),
    assertType<equals<[], []>>().toBeTrue(),
    assertType<equals<[number, string], [number, string]>>().toBeTrue(),
    assertType<equals<() => void, () => void>>().toBeTrue(),
    assertType<equals<1 | number & {}, number>>().toBeTrue(),

    assertType<equals<string, number>>().toBeFalse(),
    assertType<equals<number, boolean>>().toBeFalse(),
    assertType<equals<boolean, undefined>>().toBeFalse(),
    assertType<equals<undefined, null>>().toBeFalse(),
    assertType<equals<null, symbol>>().toBeFalse(),
    assertType<equals<symbol, any>>().toBeFalse(),
    assertType<equals<any, unknown>>().toBeFalse(),
    assertType<equals<unknown, never>>().toBeFalse(),
    assertType<equals<never, string>>().toBeFalse(),
    assertType<equals<'', string>>().toBeFalse(),
    assertType<equals<0, number>>().toBeFalse(),
    assertType<equals<{ a: number }, { a: string }>>().toBeFalse(),
    assertType<equals<[], [number]>>().toBeFalse(),
    assertType<equals<[number, string], [string, number]>>().toBeFalse(),
    assertType<equals<() => void, (arg: number) => void>>().toBeFalse(),
  ]);

  testType('Any', [
    assertType<equals<any, string>>().toBeFalse(),
    assertType<equals<any, number>>().toBeFalse(),
    assertType<equals<any, boolean>>().toBeFalse(),
    assertType<equals<any, undefined>>().toBeFalse(),
    assertType<equals<any, null>>().toBeFalse(),
    assertType<equals<any, symbol>>().toBeFalse(),
    assertType<equals<any, { a: number }>>().toBeFalse(),
    assertType<equals<any, []>>().toBeFalse(),
    assertType<equals<any, [number, string]>>().toBeFalse(),
    assertType<equals<any, () => void>>().toBeFalse(),
    assertType<equals<never, any>>().toBeFalse(),
    assertType<equals<unknown, any>>().toBeFalse(),
    assertType<equals<any, never>>().toBeFalse(),
    assertType<equals<any, unknown>>().toBeFalse(),
  ]);

  testType('Unknown', [
    assertType<equals<unknown, string>>().toBeFalse(),
    assertType<equals<unknown, number>>().toBeFalse(),
    assertType<equals<unknown, boolean>>().toBeFalse(),
    assertType<equals<unknown, undefined>>().toBeFalse(),
    assertType<equals<unknown, null>>().toBeFalse(),
    assertType<equals<unknown, symbol>>().toBeFalse(),
    assertType<equals<unknown, { a: number }>>().toBeFalse(),
    assertType<equals<unknown, []>>().toBeFalse(),
    assertType<equals<unknown, [number, string]>>().toBeFalse(),
    assertType<equals<unknown, () => void>>().toBeFalse(),
  ]);

  testType('Never', [
    assertType<equals<never, string>>().toBeFalse(),
    assertType<equals<never, number>>().toBeFalse(),
    assertType<equals<never, boolean>>().toBeFalse(),
    assertType<equals<never, undefined>>().toBeFalse(),
    assertType<equals<never, null>>().toBeFalse(),
    assertType<equals<never, symbol>>().toBeFalse(),
    assertType<equals<never, { a: number }>>().toBeFalse(),
    assertType<equals<never, []>>().toBeFalse(),
    assertType<equals<never, [number, string]>>().toBeFalse(),
    assertType<equals<never, () => void>>().toBeFalse(),

  ]);

  testType('Should be false if are the same union type', [
    assertType<equals<string | number, string | number>>().toBeTrue(),
    assertType<equals<1 | 2 | 3, 1 | 2 | 3>>().toBeTrue(),
    assertType<equals<'a' | 'b', 'a' | 'b'>>().toBeTrue(),
  ]);

  testType('Should not import the order in Union types', [
    assertType<equals<string | number, number | string>>().toBeTrue(),
    assertType<equals<1 | 2 | 3, 3 | 2 | 1>>().toBeTrue(),
    assertType<equals<'a' | 'b', 'b' | 'a'>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same union type', [
    assertType<equals<1 | 2 | 3, 1 | 2>>().toBeFalse(),
    assertType<equals<1 | 2, 1 | 2 | 3>>().toBeFalse(),
    assertType<equals<string | number, string>>().toBeFalse(),
    assertType<equals<string | number, number>>().toBeFalse(),
    assertType<equals<string, string | number>>().toBeFalse(),
    assertType<equals<number, string | number>>().toBeFalse(),
    // union types and any type
    assertType<equals<string | number, any>>().toBeFalse(),
    assertType<equals<any, string | number>>().toBeFalse(),
    // union types and unknown type
    assertType<equals<string | number, unknown>>().toBeFalse(),
    assertType<equals<unknown, string | number>>().toBeFalse(),
    // union types and never type
    assertType<equals<string | number, never>>().toBeFalse(),
    assertType<equals<never, string | number>>().toBeFalse(),
  ]);

  testType('Should not import the order in Union types', [
    assertType<equals<string | number, number | string>>().toBeTrue(),
    assertType<equals<1 | 2 | 3, 3 | 2 | 1>>().toBeTrue(),
    assertType<equals<'a' | 'b', 'b' | 'a'>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same tuple', [
    assertType<equals<[string | number], [string]>>().toBeFalse(),
    assertType<equals<[number, string, number], [string, number, number]>>().toBeFalse(),
  ]);

  testType('Should be false if are not the same union tuple', [
    assertType<equals<[string] | [number], [string]>>().toBeFalse(),
    assertType<equals<[string] | [number], [number] | [string] | []>>().toBeFalse(),
    assertType<equals<[string | number] | ['123'], [string]>>().toBeFalse(),
  ]);

  testType('Should be true if are the same union tuple', [
    assertType<equals<[string] | [number], [number] | [string]>>().toBeTrue(),
    assertType<equals<[string | number] | [1 | 2], [string | number]>>().toBeTrue(),
    assertType<equals<[string] | ['123'], [string]>>().toBeTrue(),
  ]);

  testType('Should be false if are not the same object', [
    assertType<equals<{ prop1: string }, { prop1?: string }>>().toBeFalse(),
    assertType<equals<{ prop1?: string }, { prop1: string }>>().toBeFalse(),
    assertType<equals<{ prop1: string }, { readonly prop1: string }>>().toBeFalse(),
    assertType<equals<{ readonly prop1: string }, { prop1: string }>>().toBeFalse(),

    assertType<equals<{ prop1?: undefined }, { prop1: undefined }>>().toBeFalse(),
    assertType<equals<{ prop1: string } | number, { prop1?: string }>>().toBeFalse(),
    assertType<equals<{ prop1: string } | { prop1: number }, { prop1?: string } | { prop1?: number }>>().toBeFalse(),
    assertType<equals<{ prop1?: undefined } | { prop1?: '1' }, { prop1: undefined } | { prop1: '1' }>>().toBeFalse(),
    assertType<equals<{ prop1?: string } | { prop1?: number }, { prop1?: string } | { readonly prop1?: number }>>().toBeFalse(),
  ]);

  testType('Should be true if are the same object', [
    assertType<equals<{ prop1: string }, { prop1: string }>>().toBeTrue(),
    assertType<equals<{ prop1?: string }, { prop1?: string }>>().toBeTrue(),
    assertType<equals<{ readonly prop1: string }, { readonly prop1: string }>>().toBeTrue(),
    assertType<equals<{ readonly prop1?: string }, { readonly prop1?: string }>>().toBeTrue(),
    assertType<equals<{ prop1?: undefined }, { prop1?: undefined }>>().toBeTrue(),
    assertType<equals<{ prop1?: string } | { readonly prop1?: number }, { prop1?: string } | { readonly prop1?: number }>>().toBeTrue(),
    assertType<equals<Record<'x', 'x'>, { x: 'x' }>>().toBeTrue(),
    assertType<equals<{ a: 'a' } & { b: 'b' }, { a: 'a'; b: 'b' }>>().toBeTrue(),
  ]);

  testType('functions', () => {
    type expected = equals<
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
    assertType<isSupertype<string | number, string>>().toBeTrue(),
    assertType<isSupertype<number | string, number>>().toBeTrue(),
    assertType<isSupertype<any, never>>().toBeTrue(), // "any" is supertype of any type.
    assertType<isSupertype<any, any>>().toBeTrue(), // "any" is supertype of itself.
    assertType<isSupertype<unknown, any>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<isSupertype<unknown, never>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<isSupertype<unknown, string>>().toBeTrue(), // "unknown" is supertype of any type.
    assertType<isSupertype<{ a: number }, { a: number; b: string }>>().toBeTrue(),
    assertType<isSupertype<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().toBeTrue(),
  ]);

  testType('Should return false if A is not a supertype of B', [
    assertType<isSupertype<string, string | number>>().toBeFalse(),
    assertType<isSupertype<number, number | string>>().toBeFalse(),
    assertType<isSupertype<never, any>>().toBeFalse(), // "never" is not supertype of any type.
    assertType<isSupertype<{ a: number; b: string }, { a: number }>>().toBeFalse(),
    assertType<isSupertype<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().toBeFalse(),
  ]);
});

describeType('IsSubType', () => {
  testType('Should return true if A is a subtype of B', [
    assertType<isSubtype<string, string | number>>().toBeTrue(),
    assertType<isSubtype<number, number | string>>().toBeTrue(),
    assertType<isSubtype<never, any>>().toBeTrue(), // any type is subtype of any type.
    assertType<isSubtype<any, any>>().toBeTrue(), // "any" is subtype of itself.
    assertType<isSubtype<unknown, any>>().toBeTrue(), // "unknown" is subtype of "any" type.
    assertType<isSubtype<string, unknown>>().toBeTrue(), // any type is subtype of "unknown" type.
    assertType<isSubtype<never, unknown>>().toBeTrue(), // any type is subtype of "unknown" type.
    assertType<isSubtype<{ a: number; b: string }, { a: number }>>().toBeTrue(),
    assertType<isSubtype<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().toBeTrue(),
  ]);

  testType('Should return false if A is not a subtype of B', [
    assertType<isSubtype<string | number, string>>().toBeFalse(),
    assertType<isSubtype<number | string, number>>().toBeFalse(),
    assertType<isSubtype<any, never>>().toBeFalse(), // "any" is not subtype of "never"
    assertType<isSubtype<unknown, string>>().toBeFalse(), // "unknown" is not subtype of any type except itself and "any".
    assertType<isSubtype<{ a: number }, { a: number; b: string }>>().toBeFalse(),
    assertType<isSubtype<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().toBeFalse(),
  ]);
});