import { $keyof, cast, defaultOnNullable, unionToIntersection, valueof } from './infrastructure';

describeType('ValueOf', () => {
  testType('Should return the union of the value types', [
    assertType<valueof<{ a: number; b: string }>>().equals<number | string>(),
    assertType<valueof<{ a: any; b: unknown }>>().toBeAny(),
    assertType<valueof<{ a: never; b: never }>>().toBeNever(),
  ]);
});

describeType('KeysOfUnion', () => {
  testType('Should return the union of the keys of the object types in the union', [
    assertType<$keyof<{ a: number; b: string } | { c: boolean }>>().equals<'a' | 'b' | 'c'>(),
    assertType<$keyof<{ a: any } | { b: unknown }>>().equals<'a' | 'b'>(),
    assertType<$keyof<{ a: never } | { b: never }>>().equals<'a' | 'b'>(),
  ]);
});

describeType('UnionToIntersection', () => {
  testType('Should return a single object type with the union of keys and values', [
    assertType<unionToIntersection<{ a: number; b: string } | { a: string; c: boolean }>>().equals<{ a: number | string; b: string; c: boolean }>(),
    assertType<unionToIntersection<{ a: any } | { b: unknown }>>().equals<{ a: any; b: unknown }>(),
    assertType<unionToIntersection<{ a: never } | { b: never }>>().equals<{ a: never; b: never }>(),
  ]);
});

describeType('Cast', () => {
  testType('Should cast T to U if T is not a subtype of U', [
    assertType<cast<string, number>>().equals<number>(),
  ]);

  testType('Should return T if T is a subtype of U', [
    assertType<cast<'a', string>>().equals<'a'>(),
    assertType<cast<5, number>>().equals<5>(),
  ]);

  testType('Should allow casting to union types', [
    assertType<cast<number, number | string>>().equals<number>(),
  ]);

  testType('Should cast arrays to broader array types', [
    assertType<cast<number[], any[]>>().equals<number[]>(),
  ]);
});

describeType('DefaultOnUnknown', () => {
  testType('Should replace type with the default type', () => {
    type result = defaultOnNullable<undefined, string>;
    type result2 = defaultOnNullable<unknown, string>;
    type result3 = defaultOnNullable<null, string>;

    assertType<result>().toBeString();
    assertType<result2>().toBeString();
    assertType<result3>().toBeString();
  });

  testType('Should retain the original type if it is not undefined | unknown', () => {
    type result = defaultOnNullable<number, string>;
    assertType<result>().equals<number>();
  });
});