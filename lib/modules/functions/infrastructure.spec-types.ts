import { IsFunction } from './infrastructure';

describeType('IsFunction', () => {
  testType('Should return true only for function', [
    assertType<IsFunction<() => void>>().toBeTrue(),
    assertType<IsFunction<() => void | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsFunction<any>>().toBeFalse(),
    assertType<IsFunction<never>>().toBeFalse(),
    assertType<IsFunction<number>>().toBeFalse(),
    assertType<IsFunction<{}>>().toBeFalse(),
    assertType<IsFunction<null>>().toBeFalse(),
    assertType<IsFunction<undefined>>().toBeFalse(),
    assertType<IsFunction<unknown>>().toBeFalse(),
    assertType<IsFunction<any[]>>().toBeFalse(),
    assertType<IsFunction<symbol>>().toBeFalse(),
    assertType<IsFunction<bigint>>().toBeFalse(),
    assertType<IsFunction<string | number>>().toBeFalse(),
  ]);
});