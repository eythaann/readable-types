import { defaultOnAny, isAny } from './infrastructure';

describeType('IsAny', () => {
  testType('Should return true only for type any', [
    assertType<isAny<any>>().toBeTrue(),
    assertType<isAny<any | string>>().toBeTrue(), // union with "any" resolves to "any"
    assertType<isAny<any & string>>().toBeTrue(), // intersection with "any" resolves to "any"
  ]);

  testType('Should return false for all other types', [
    assertType<isAny<string>>().toBeFalse(),
    assertType<isAny<number>>().toBeFalse(),
    assertType<isAny<{}>>().toBeFalse(),
    assertType<isAny<null>>().toBeFalse(),
    assertType<isAny<undefined>>().toBeFalse(),
    assertType<isAny<unknown>>().toBeFalse(),
    assertType<isAny<never>>().toBeFalse(),
    assertType<isAny<any[]>>().toBeFalse(),
    assertType<isAny<symbol>>().toBeFalse(),
    assertType<isAny<bigint>>().toBeFalse(),
    assertType<isAny<string | number>>().toBeFalse(),
    assertType<isAny<string & number>>().toBeFalse(),
  ]);
});

describeType('defaultOnAny', () => {
  testType('Should replace any type with the default type', () => {
    type result = defaultOnAny<any, string>;
    assertType<result>().equals<string>();
  });

  testType('Should retain the original type if it is not any', () => {
    type result = defaultOnAny<number, string>;
    assertType<result>().equals<number>();
  });
});
