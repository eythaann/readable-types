import { isFunction } from './infrastructure';

describeType('IsFunction', () => {
  testType('Should return true only for function', [
    assertType<isFunction<() => void>>().toBeTrue(),
    assertType<isFunction<() => void | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<isFunction<any>>().toBeFalse(),
    assertType<isFunction<never>>().toBeFalse(),
    assertType<isFunction<number>>().toBeFalse(),
    assertType<isFunction<{}>>().toBeFalse(),
    assertType<isFunction<null>>().toBeFalse(),
    assertType<isFunction<undefined>>().toBeFalse(),
    assertType<isFunction<unknown>>().toBeFalse(),
    assertType<isFunction<any[]>>().toBeFalse(),
    assertType<isFunction<symbol>>().toBeFalse(),
    assertType<isFunction<bigint>>().toBeFalse(),
    assertType<isFunction<string | number>>().toBeFalse(),
    assertType<isFunction<unknownObject>>().toBeFalse(),
    assertType<isFunction<anyObject>>().toBeFalse(),
  ]);
});