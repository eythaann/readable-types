import { IsUnknown } from './infrastructure';

describeType('IsUnknown', () => {
  testType('Should return true only for type unknown', [
    assertType<IsUnknown<unknown>>().equals<true>(),
    assertType<IsUnknown<unknown | string>>().equals<true>(), // union with "unknown" resolves to "unknown"
  ]);

  testType('Should return false for all other types', [
    assertType<IsUnknown<any>>().equals<false>(),
    assertType<IsUnknown<string>>().equals<false>(),
    assertType<IsUnknown<number>>().equals<false>(),
    assertType<IsUnknown<{}>>().equals<false>(),
    assertType<IsUnknown<any[]>>().equals<false>(),
    assertType<IsUnknown<never>>().equals<false>(),
    assertType<IsUnknown<unknown & string>>().equals<false>(),
  ]);
});