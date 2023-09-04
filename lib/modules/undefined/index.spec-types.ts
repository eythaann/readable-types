import { IsNull, IsUndefined } from '.';

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