import { defaultOnUndefined, isNull, isUndefined, nonNull, nonUndefined } from './infrastructure';

describeType('IsUndefined', () => {
  testType('Should return true only for undefined', [
    assertType<isUndefined<undefined>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<isUndefined<string>>().toBeFalse(),
    assertType<isUndefined<number>>().toBeFalse(),
    assertType<isUndefined<{}>>().toBeFalse(),
    assertType<isUndefined<null>>().toBeFalse(),
    assertType<isUndefined<any>>().toBeFalse(),
    assertType<isUndefined<unknown>>().toBeFalse(),
    assertType<isUndefined<never>>().toBeFalse(),
    assertType<isUndefined<any[]>>().toBeFalse(),
    assertType<isUndefined<symbol>>().toBeFalse(),
    assertType<isUndefined<bigint>>().toBeFalse(),
    assertType<isUndefined<undefined | number>>().toBeFalse(),
  ]);
});

describeType('IsNull', () => {
  testType('Should return true only for null', [
    assertType<isNull<null>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<isNull<string>>().toBeFalse(),
    assertType<isNull<number>>().toBeFalse(),
    assertType<isNull<{}>>().toBeFalse(),
    assertType<isNull<undefined>>().toBeFalse(),
    assertType<isNull<any>>().toBeFalse(),
    assertType<isNull<unknown>>().toBeFalse(),
    assertType<isNull<never>>().toBeFalse(),
    assertType<isNull<any[]>>().toBeFalse(),
    assertType<isNull<symbol>>().toBeFalse(),
    assertType<isNull<bigint>>().toBeFalse(),
    assertType<isNull<null | number>>().toBeFalse(),
  ]);
});

describeType('NonUndefined', () => {
  testType('Should remove undefined from a union type that includes it', () => {
    type TestType = string | number | undefined;
    type ExpectedType = string | number;
    assertType<nonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should not modify a type that is already non-undefined', () => {
    type TestType = string | number;
    type ExpectedType = string | number;
    assertType<nonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should return never when the type is strictly undefined', () => {
    type TestType = undefined;
    type ExpectedType = never;
    assertType<nonUndefined<TestType>>().equals<ExpectedType>();
  });

  testType('Should remove undefined from complex types', () => {
    type TestType = { a: number; b?: string } | undefined;
    type ExpectedType = { a: number; b?: string };
    assertType<nonUndefined<TestType>>().equals<ExpectedType>();
  });
});

describeType('NonNull', () => {
  testType('Should remove null from a union type that includes it', () => {
    type TestType = string | number | null;
    type ExpectedType = string | number;
    assertType<nonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should not modify a type that is already non-null', () => {
    type TestType = string | number;
    type ExpectedType = string | number;
    assertType<nonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should return never when the type is strictly null', () => {
    type TestType = null;
    type ExpectedType = never;
    assertType<nonNull<TestType>>().equals<ExpectedType>();
  });

  testType('Should remove null from complex types', () => {
    type TestType = { a: number; b?: string } | null;
    type ExpectedType = { a: number; b?: string };
    assertType<nonNull<TestType>>().equals<ExpectedType>();
  });
});

describeType('DefaultOnUnknown', () => {
  testType('Should replace undefined type with the default type', () => {
    type result = defaultOnUndefined<undefined, string>;
    assertType<result>().equals<string>();
  });

  testType('Should retain the original type if it is not undefined', () => {
    type result = defaultOnUndefined<number, string>;
    assertType<result>().equals<number>();
  });
});