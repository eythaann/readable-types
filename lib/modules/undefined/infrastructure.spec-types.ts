import { DefaultOnUndefined, IsNull, IsUndefined, NonNull, NonUndefined } from './infrastructure';

describeType('IsUndefined', () => {
  testType('Should return true only for undefined', [
    assertType<IsUndefined<undefined>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsUndefined<string>>().toBeFalse(),
    assertType<IsUndefined<number>>().toBeFalse(),
    assertType<IsUndefined<{}>>().toBeFalse(),
    assertType<IsUndefined<null>>().toBeFalse(),
    assertType<IsUndefined<any>>().toBeFalse(),
    assertType<IsUndefined<unknown>>().toBeFalse(),
    assertType<IsUndefined<never>>().toBeFalse(),
    assertType<IsUndefined<any[]>>().toBeFalse(),
    assertType<IsUndefined<symbol>>().toBeFalse(),
    assertType<IsUndefined<bigint>>().toBeFalse(),
    assertType<IsUndefined<undefined | number>>().toBeFalse(),
  ]);
});

describeType('IsNull', () => {
  testType('Should return true only for null', [
    assertType<IsNull<null>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsNull<string>>().toBeFalse(),
    assertType<IsNull<number>>().toBeFalse(),
    assertType<IsNull<{}>>().toBeFalse(),
    assertType<IsNull<undefined>>().toBeFalse(),
    assertType<IsNull<any>>().toBeFalse(),
    assertType<IsNull<unknown>>().toBeFalse(),
    assertType<IsNull<never>>().toBeFalse(),
    assertType<IsNull<any[]>>().toBeFalse(),
    assertType<IsNull<symbol>>().toBeFalse(),
    assertType<IsNull<bigint>>().toBeFalse(),
    assertType<IsNull<null | number>>().toBeFalse(),
  ]);
});

describeType('NonUndefined', () => {
  testType('Should remove undefined from a union type that includes it', () => {
    type TestType = string | number | undefined;
    type ExpectedType = string | number;
    assertType<NonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should not modify a type that is already non-undefined', () => {
    type TestType = string | number;
    type ExpectedType = string | number;
    assertType<NonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should return never when the type is strictly undefined', () => {
    type TestType = undefined;
    type ExpectedType = never;
    assertType<NonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should remove undefined from complex types', () => {
    type TestType = { a: number; b?: string } | undefined;
    type ExpectedType = { a: number; b?: string };
    assertType<NonUndefined<TestType>>().equals<ExpectedType>();
  });
});

describeType('NonNull', () => {
  testType('Should remove null from a union type that includes it', () => {
    type TestType = string | number | null;
    type ExpectedType = string | number;
    assertType<NonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should not modify a type that is already non-null', () => {
    type TestType = string | number;
    type ExpectedType = string | number;
    assertType<NonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should return never when the type is strictly null', () => {
    type TestType = null;
    type ExpectedType = never;
    assertType<NonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should remove null from complex types', () => {
    type TestType = { a: number; b?: string } | null;
    type ExpectedType = { a: number; b?: string };
    assertType<NonNull<TestType>>().equals<ExpectedType>();
  });
});

describeType('DefaultOnUnknown', () => {
  testType('Should replace undefined type with the default type', () => {
    type result = DefaultOnUndefined<undefined, string>;
    assertType<result>().equals<string>();
  });

  testType('Should retain the original type if it is not undefined', () => {
    type result = DefaultOnUndefined<number, string>;
    assertType<result>().equals<number>();
  });
});