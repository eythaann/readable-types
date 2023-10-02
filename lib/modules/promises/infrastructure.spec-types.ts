import { IsPromise } from './infrastructure';

describeType('IsPromise', () => {
  testType('Should return true for Promise types', [
    assertType<IsPromise<Promise<string>>>().toBeTrue(),
    assertType<IsPromise<Promise<number>>>().toBeTrue(),
    assertType<IsPromise<Promise<unknown>>>().toBeTrue(),
  ]);

  testType('Should return false for non-Promise types', [
    assertType<IsPromise<string>>().toBeFalse(),
    assertType<IsPromise<number>>().toBeFalse(),
    assertType<IsPromise<{}>>().toBeFalse(),
    assertType<IsPromise<any[]>>().toBeFalse(),
    assertType<IsPromise<never>>().toBeFalse(),
  ]);
});