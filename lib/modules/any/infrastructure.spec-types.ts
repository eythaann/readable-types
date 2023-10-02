import { IsAny } from './infrastructure';

describeType('IsAny', () => {
  testType('Should return true only for type any', [
    assertType<IsAny<any>>().toBeTrue(),
    assertType<IsAny<any | string>>().toBeTrue(), // union with "any" resolves to "any"
    assertType<IsAny<any & string>>().toBeTrue(), // intersection with "any" resolves to "any"
  ]);

  testType('Should return false for all other types', [
    assertType<IsAny<string>>().toBeFalse(),
    assertType<IsAny<number>>().toBeFalse(),
    assertType<IsAny<{}>>().toBeFalse(),
    assertType<IsAny<null>>().toBeFalse(),
    assertType<IsAny<undefined>>().toBeFalse(),
    assertType<IsAny<unknown>>().toBeFalse(),
    assertType<IsAny<never>>().toBeFalse(),
    assertType<IsAny<any[]>>().toBeFalse(),
    assertType<IsAny<symbol>>().toBeFalse(),
    assertType<IsAny<bigint>>().toBeFalse(),
    assertType<IsAny<string | number>>().toBeFalse(),
    assertType<IsAny<string & number>>().toBeFalse(),
  ]);
});
