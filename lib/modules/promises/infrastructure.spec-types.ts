import { IsPromise } from './infrastructure';

describeType('IsPromise', () => {
  testType('Should return true for Promise types', [
    assertType<IsPromise<Promise<string>>>().equals<true>(),
    assertType<IsPromise<Promise<number>>>().equals<true>(),
    assertType<IsPromise<Promise<unknown>>>().equals<true>(),
  ]);

  testType('Should return false for non-Promise types', [
    assertType<IsPromise<string>>().equals<false>(),
    assertType<IsPromise<number>>().equals<false>(),
    assertType<IsPromise<{}>>().equals<false>(),
    assertType<IsPromise<any[]>>().equals<false>(),
    assertType<IsPromise<never>>().equals<false>(),
  ]);
});