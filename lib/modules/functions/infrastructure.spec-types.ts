import { IsFunction } from './infrastructure';

describeType('IsFunction', () => {
  testType('Should return true only for function', [
    assertType<IsFunction<() => void>>().equals<true>(),
    assertType<IsFunction<() => void | never>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsFunction<any>>().equals<false>(),
    assertType<IsFunction<never>>().equals<false>(),
    assertType<IsFunction<number>>().equals<false>(),
    assertType<IsFunction<{}>>().equals<false>(),
    assertType<IsFunction<null>>().equals<false>(),
    assertType<IsFunction<undefined>>().equals<false>(),
    assertType<IsFunction<unknown>>().equals<false>(),
    assertType<IsFunction<any[]>>().equals<false>(),
    assertType<IsFunction<symbol>>().equals<false>(),
    assertType<IsFunction<bigint>>().equals<false>(),
    assertType<IsFunction<string | number>>().equals<false>(),
  ]);
});