import { isNumber, strToNumber } from './infrastructure';

describeType('IsNumber', () => {
  testType('Should return false if type is not a number', [
    assertType<isNumber<string>>().toBeFalse(),
    assertType<isNumber<'1234'>>().toBeFalse(),
    assertType<isNumber<any>>().toBeFalse(),
    assertType<isNumber<unknown>>().toBeFalse(),
    assertType<isNumber<undefined>>().toBeFalse(),
    assertType<isNumber<null>>().toBeFalse(),
    assertType<isNumber<anyObject>>().toBeFalse(),
    assertType<isNumber<anyFunction>>().toBeFalse(),
    assertType<isNumber<bigint>>().toBeFalse(),
    assertType<isNumber<any[]>>().toBeFalse(),
    assertType<isNumber<never[]>>().toBeFalse(),
    assertType<isNumber<symbol>>().toBeFalse(),
    assertType<isNumber<never>>().toBeFalse(),
    assertType<isNumber<string | number>>().toBeFalse(),
    assertType<isNumber<number & string>>().toBeFalse(),
  ]);

  testType('Should return true if type is a number', [
    assertType<isNumber<number>>().toBeTrue(),
    assertType<isNumber<1234>>().toBeTrue(),
    assertType<isNumber<number | never>>().toBeTrue(),
  ]);
});

describeType('StrToNumber', () => {
  testType('Should convert string representation of a number to number type', () => {
    type result = strToNumber<'42'>;
    assertType<result>().equals<42>();
  });

  testType('Should result in never for non-numeric string', () => {
    type result = strToNumber<'foo'>;
    assertType<result>().toBeNever();
  });
});