import { isPromise } from './infrastructure';

describeType('IsPromise', () => {
  testType('Should return true for Promise types', [
    assertType<isPromise<Promise<string>>>().toBeTrue(),
    assertType<isPromise<Promise<number>>>().toBeTrue(),
    assertType<isPromise<Promise<unknown>>>().toBeTrue(),
  ]);

  testType('Should return false for non-Promise types', [
    assertType<isPromise<string>>().toBeFalse(),
    assertType<isPromise<number>>().toBeFalse(),
    assertType<isPromise<{}>>().toBeFalse(),
    assertType<isPromise<any[]>>().toBeFalse(),
    assertType<isPromise<never>>().toBeFalse(),
  ]);
});