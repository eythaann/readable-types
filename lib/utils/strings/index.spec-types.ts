import { IsString } from '.';

describeType('IsString', () => {
  testType('Should return true only for string', [
    assertType<IsString<string>>().equals<true>(),
    assertType<IsString<string | never>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsString<any>>().equals<false>(),
    assertType<IsString<never>>().equals<false>(),
    assertType<IsString<number>>().equals<false>(),
    assertType<IsString<{}>>().equals<false>(),
    assertType<IsString<null>>().equals<false>(),
    assertType<IsString<undefined>>().equals<false>(),
    assertType<IsString<unknown>>().equals<false>(),
    assertType<IsString<any[]>>().equals<false>(),
    assertType<IsString<symbol>>().equals<false>(),
    assertType<IsString<bigint>>().equals<false>(),
    assertType<IsString<string | number>>().equals<false>(),
  ]);
});