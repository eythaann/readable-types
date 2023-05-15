import { KeysOfUnion, UnionToIntersection, ValueOf } from '.';

describeType('ValueOf', () => {
  testType('Should return the union of the value types', [
    assertType<ValueOf<{ a: number; b: string }>>().equals<number | string>(),
    assertType<ValueOf<{ a: any; b: unknown }>>().equals<any>(),
    assertType<ValueOf<{ a: never; b: never }>>().equals<never>(),
  ]);
});

describeType('KeysOfUnion', () => {
  testType('Should return the union of the keys of the object types in the union', [
    assertType<KeysOfUnion<{ a: number; b: string } | { c: boolean }>>().equals<'a' | 'b' | 'c'>(),
    assertType<KeysOfUnion<{ a: any } | { b: unknown }>>().equals<'a' | 'b'>(),
    assertType<KeysOfUnion<{ a: never } | { b: never }>>().equals<'a' | 'b'>(),
  ]);
});

describeType('UnionToIntersection', () => {
  testType('Should return a single object type with the union of keys and values', [
    assertType<UnionToIntersection<{ a: number; b: string } | { a: string; c: boolean }>>().equals<{ a: number | string; b: string; c: boolean }>(),
    assertType<UnionToIntersection<{ a: any } | { b: unknown }>>().equals<{ a: any; b: unknown }>(),
    assertType<UnionToIntersection<{ a: never } | { b: never }>>().equals<{ a: never; b: never }>(),
  ]);
});