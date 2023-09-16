import { IsNull, IsUndefined, NonNull, NonUndefined } from '.';

describeType('IsUndefined', () => {
  testType('Should return true only for undefined', [
    assertType<IsUndefined<undefined>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsUndefined<string>>().equals<false>(),
    assertType<IsUndefined<number>>().equals<false>(),
    assertType<IsUndefined<{}>>().equals<false>(),
    assertType<IsUndefined<null>>().equals<false>(),
    assertType<IsUndefined<any>>().equals<false>(),
    assertType<IsUndefined<unknown>>().equals<false>(),
    assertType<IsUndefined<never>>().equals<false>(),
    assertType<IsUndefined<any[]>>().equals<false>(),
    assertType<IsUndefined<symbol>>().equals<false>(),
    assertType<IsUndefined<bigint>>().equals<false>(),
    assertType<IsUndefined<undefined | number>>().equals<false>(),
  ]);
});

describeType('IsNull', () => {
  testType('Should return true only for null', [
    assertType<IsNull<null>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsNull<string>>().equals<false>(),
    assertType<IsNull<number>>().equals<false>(),
    assertType<IsNull<{}>>().equals<false>(),
    assertType<IsNull<undefined>>().equals<false>(),
    assertType<IsNull<any>>().equals<false>(),
    assertType<IsNull<unknown>>().equals<false>(),
    assertType<IsNull<never>>().equals<false>(),
    assertType<IsNull<any[]>>().equals<false>(),
    assertType<IsNull<symbol>>().equals<false>(),
    assertType<IsNull<bigint>>().equals<false>(),
    assertType<IsNull<null | number>>().equals<false>(),
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