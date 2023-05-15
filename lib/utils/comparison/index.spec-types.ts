import { Equals, IsSubType, IsSuperType } from '.';

describeType('Equals', () => {
  testType('Should determine if two types are equal', [
    // primitives
    assertType<Equals<string, string>>().equals<true>(),
    assertType<Equals<number, number>>().equals<true>(),
    assertType<Equals<boolean, boolean>>().equals<true>(),
    assertType<Equals<undefined, undefined>>().equals<true>(),
    assertType<Equals<null, null>>().equals<true>(),
    assertType<Equals<symbol, symbol>>().equals<true>(),
    assertType<Equals<any, any>>().equals<true>(),
    assertType<Equals<unknown, unknown>>().equals<true>(),
    assertType<Equals<never, never>>().equals<true>(),

    // primitives mismatch
    assertType<Equals<string, number>>().equals<false>(),
    assertType<Equals<number, boolean>>().equals<false>(),
    assertType<Equals<boolean, undefined>>().equals<false>(),
    assertType<Equals<undefined, null>>().equals<false>(),
    assertType<Equals<null, symbol>>().equals<false>(),
    assertType<Equals<symbol, any>>().equals<false>(),
    assertType<Equals<any, unknown>>().equals<false>(),
    assertType<Equals<unknown, never>>().equals<false>(),
    assertType<Equals<never, string>>().equals<false>(),

    // other types
    assertType<Equals<{ a: number }, { a: number }>>().equals<true>(),
    assertType<Equals<[], []>>().equals<true>(),
    assertType<Equals<[number, string], [number, string]>>().equals<true>(),
    assertType<Equals<() => void, () => void>>().equals<true>(),

    // other types mismatch
    assertType<Equals<{ a: number }, { a: string }>>().equals<false>(),
    assertType<Equals<[], [number]>>().equals<false>(),
    assertType<Equals<[number, string], [string, number]>>().equals<false>(),
    assertType<Equals<() => void, (arg: number) => void>>().equals<false>(),

    // any and other types
    assertType<Equals<any, string>>().equals<false>(),
    assertType<Equals<any, number>>().equals<false>(),
    assertType<Equals<any, boolean>>().equals<false>(),
    assertType<Equals<any, undefined>>().equals<false>(),
    assertType<Equals<any, null>>().equals<false>(),
    assertType<Equals<any, symbol>>().equals<false>(),
    assertType<Equals<any, { a: number }>>().equals<false>(),
    assertType<Equals<any, []>>().equals<false>(),
    assertType<Equals<any, [number, string]>>().equals<false>(),
    assertType<Equals<any, () => void>>().equals<false>(),

    // unknown and other types
    assertType<Equals<unknown, string>>().equals<false>(),
    assertType<Equals<unknown, number>>().equals<false>(),
    assertType<Equals<unknown, boolean>>().equals<false>(),
    assertType<Equals<unknown, undefined>>().equals<false>(),
    assertType<Equals<unknown, null>>().equals<false>(),
    assertType<Equals<unknown, symbol>>().equals<false>(),
    assertType<Equals<unknown, { a: number }>>().equals<false>(),
    assertType<Equals<unknown, []>>().equals<false>(),
    assertType<Equals<unknown, [number, string]>>().equals<false>(),
    assertType<Equals<unknown, () => void>>().equals<false>(),

    // never and other types
    assertType<Equals<never, string>>().equals<false>(),
    assertType<Equals<never, number>>().equals<false>(),
    assertType<Equals<never, boolean>>().equals<false>(),
    assertType<Equals<never, undefined>>().equals<false>(),
    assertType<Equals<never, null>>().equals<false>(),
    assertType<Equals<never, symbol>>().equals<false>(),
    assertType<Equals<never, { a: number }>>().equals<false>(),
    assertType<Equals<never, []>>().equals<false>(),
    assertType<Equals<never, [number, string]>>().equals<false>(),
    assertType<Equals<never, () => void>>().equals<false>(),

    // boundary cases
    assertType<Equals<'', string>>().equals<false>(),
    assertType<Equals<0, number>>().equals<false>(),
    assertType<Equals<false, boolean>>().equals<false>(),
    assertType<Equals<never, any>>().equals<false>(),
    assertType<Equals<unknown, any>>().equals<false>(),
    assertType<Equals<unknown, never>>().equals<false>(),
    assertType<Equals<any, never>>().equals<false>(),
    assertType<Equals<any, unknown>>().equals<false>(),
  ]);
});

describeType('IsSuperType', () => {
  testType('Should return true if A is a supertype of B', [
    assertType<IsSuperType<string | number, string>>().equals<true>(),
    assertType<IsSuperType<number | string, number>>().equals<true>(),
    assertType<IsSuperType<any, never>>().equals<true>(), // "any" is supertype of any type.
    assertType<IsSuperType<any, any>>().equals<true>(), // "any" is supertype of itself.
    assertType<IsSuperType<unknown, any>>().equals<true>(), // "unknown" is supertype of any type.
    assertType<IsSuperType<unknown, never>>().equals<true>(), // "unknown" is supertype of any type.
    assertType<IsSuperType<unknown, string>>().equals<true>(), // "unknown" is supertype of any type.
    assertType<IsSuperType<{ a: number }, { a: number; b: string }>>().equals<true>(),
    assertType<IsSuperType<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().equals<true>(),
  ]);

  testType('Should return false if A is not a supertype of B', [
    assertType<IsSuperType<string, string | number>>().equals<false>(),
    assertType<IsSuperType<number, number | string>>().equals<false>(),
    assertType<IsSuperType<never, any>>().equals<false>(), // "never" is not supertype of any type.
    assertType<IsSuperType<{ a: number; b: string }, { a: number }>>().equals<false>(),
    assertType<IsSuperType<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().equals<false>(),
  ]);
});

describeType('IsSubType', () => {
  testType('Should return true if A is a subtype of B', [
    assertType<IsSubType<string, string | number>>().equals<true>(),
    assertType<IsSubType<number, number | string>>().equals<true>(),
    assertType<IsSubType<never, any>>().equals<true>(), // any type is subtype of any type.
    assertType<IsSubType<any, any>>().equals<true>(), // "any" is subtype of itself.
    assertType<IsSubType<unknown, any>>().equals<true>(), // "unknown" is subtype of "any" type.
    assertType<IsSubType<string, unknown>>().equals<true>(), // any type is subtype of "unknown" type.
    assertType<IsSubType<never, unknown>>().equals<true>(), // any type is subtype of "unknown" type.
    assertType<IsSubType<{ a: number; b: string }, { a: number }>>().equals<true>(),
    assertType<IsSubType<{ a: number; b: string; c: boolean }, { a: number; b: string }>>().equals<true>(),
  ]);

  testType('Should return false if A is not a subtype of B', [
    assertType<IsSubType<string | number, string>>().equals<false>(),
    assertType<IsSubType<number | string, number>>().equals<false>(),
    assertType<IsSubType<any, never>>().equals<false>(), // "any" is not subtype of "never"
    assertType<IsSubType<unknown, string>>().equals<false>(), // "unknown" is not subtype of any type except itself and "any".
    assertType<IsSubType<{ a: number }, { a: number; b: string }>>().equals<false>(),
    assertType<IsSubType<{ a: number; b: string }, { a: number; b: string; c: boolean }>>().equals<false>(),
  ]);
});