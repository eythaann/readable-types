import { IsNumber, StrToNumber } from './infrastructure';
import { AnyFunction } from '../functions/infrastructure';
import { AnyObject } from '../objects/infrastructure';

describeType('IsNumber', () => {
  testType('Should return false if type is not a number', [
    assertType<IsNumber<string>>().toBeFalse(),
    assertType<IsNumber<'1234'>>().toBeFalse(),
    assertType<IsNumber<any>>().toBeFalse(),
    assertType<IsNumber<unknown>>().toBeFalse(),
    assertType<IsNumber<undefined>>().toBeFalse(),
    assertType<IsNumber<null>>().toBeFalse(),
    assertType<IsNumber<AnyObject>>().toBeFalse(),
    assertType<IsNumber<AnyFunction>>().toBeFalse(),
    assertType<IsNumber<bigint>>().toBeFalse(),
    assertType<IsNumber<any[]>>().toBeFalse(),
    assertType<IsNumber<never[]>>().toBeFalse(),
    assertType<IsNumber<symbol>>().toBeFalse(),
    assertType<IsNumber<never>>().toBeFalse(),
    assertType<IsNumber<string | number>>().toBeFalse(),
    assertType<IsNumber<number & string>>().toBeFalse(),
  ]);

  testType('Should return true if type is a number', [
    assertType<IsNumber<number>>().toBeTrue(),
    assertType<IsNumber<1234>>().toBeTrue(),
    assertType<IsNumber<number | never>>().toBeTrue(),
  ]);
});

describeType('StrToNumber', () => {
  testType('Should convert string representation of a number to number type', () => {
    type result = StrToNumber<'42'>;
    assertType<result>().equals<42>();
  });

  testType('Should result in never for non-numeric string', () => {
    type result = StrToNumber<'foo'>;
    assertType<result>().toBeNever();
  });
});