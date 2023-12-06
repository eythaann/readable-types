import { Cast, Default, KeysOfUnion, UnionToIntersection, ValueOf } from './infrastructure';

describeType('ValueOf', () => {
  testType('Should return the union of the value types', [
    assertType<ValueOf<{ a: number; b: string }>>().equals<number | string>(),
    assertType<ValueOf<{ a: any; b: unknown }>>().toBeAny(),
    assertType<ValueOf<{ a: never; b: never }>>().toBeNever(),
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

describeType('Cast', () => {
  testType('Should cast T to U if T is not a subtype of U', [
    assertType<Cast<string, number>>().equals<number>(),
  ]);

  testType('Should return T if T is a subtype of U', [
    assertType<Cast<'a', string>>().equals<'a'>(),
    assertType<Cast<5, number>>().equals<5>(),
  ]);

  testType('Should allow casting to union types', [
    assertType<Cast<number, number | string>>().equals<number>(),
  ]);

  testType('Should cast arrays to broader array types', [
    assertType<Cast<number[], any[]>>().equals<number[]>(),
  ]);
});

describeType('DefaultOnUnknown', () => {
  testType('Should replace type with the default type', () => {
    type result = Default<undefined, string>;
    type result2 = Default<unknown, string>;

    assertType<result>().equals<string>();
    assertType<result2>().equals<string>();
  });

  testType('Should retain the original type if it is not undefined | unknown', () => {
    type result = Default<number, string>;
    assertType<result>().equals<number>();
  });
});