import { IsAny } from './infrastructure';

describeType('IsAny', () => {
  testType('Should return true only for type any', [
    assertType<IsAny<any>>().equals<true>(),
    assertType<IsAny<any | string>>().equals<true>(), // union with "any" resolves to "any"
    assertType<IsAny<any & string>>().equals<true>(), // intersection with "any" resolves to "any"
  ]);

  testType('Should return false for all other types', [
    assertType<IsAny<string>>().equals<false>(),
    assertType<IsAny<number>>().equals<false>(),
    assertType<IsAny<{}>>().equals<false>(),
    assertType<IsAny<null>>().equals<false>(),
    assertType<IsAny<undefined>>().equals<false>(),
    assertType<IsAny<unknown>>().equals<false>(),
    assertType<IsAny<never>>().equals<false>(),
    assertType<IsAny<any[]>>().equals<false>(),
    assertType<IsAny<symbol>>().equals<false>(),
    assertType<IsAny<bigint>>().equals<false>(),
    assertType<IsAny<string | number>>().equals<false>(),
    assertType<IsAny<string & number>>().equals<false>(),
  ]);
});
