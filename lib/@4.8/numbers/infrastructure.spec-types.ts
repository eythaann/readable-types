import { strToNumber } from './infrastructure';

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