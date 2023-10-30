import { isNever } from './infrastructure';

describeType('IsNever', () => {
  describeType('Should returns false', () => {
    testType('if type is not of type never', [
      assertType<isNever<number>>().toBeFalse(),
      assertType<isNever<string>>().toBeFalse(),
      assertType<isNever<'1234'>>().toBeFalse(),
      assertType<isNever<1234>>().toBeFalse(),
      assertType<isNever<any>>().toBeFalse(),
      assertType<isNever<unknown>>().toBeFalse(),
      assertType<isNever<undefined>>().toBeFalse(),
      assertType<isNever<null>>().toBeFalse(),
      assertType<isNever<anyObject>>().toBeFalse(),
      assertType<isNever<anyFunction>>().toBeFalse(),
      assertType<isNever<bigint>>().toBeFalse(),
      assertType<isNever<any[]>>().toBeFalse(),
      assertType<isNever<never[]>>().toBeFalse(),
      assertType<isNever<symbol>>().toBeFalse(),
    ]);

    testType('if the type is a union that includes never', [
      assertType<isNever<never | number>>().toBeFalse(),
      assertType<isNever<never | string>>().toBeFalse(),
    ]);
  });

  describeType('Should returns true', () => {
    testType('if type is of type never', [
      assertType<isNever<never>>().toBeTrue(),
    ]);

    testType('if the type is an intersection that includes never', [
      assertType<isNever<never & number>>().toBeTrue(),
      assertType<isNever<never & string>>().toBeTrue(),
    ]);
  });
});
