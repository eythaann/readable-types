import { IsNever } from './infrastructure';
import { AnyFunction } from '../functions/infrastructure';
import { AnyObject } from '../objects/infrastructure';

describeType('IsNever', () => {
  describeType('Should returns false', () => {
    testType('if type is not of type never', [
      assertType<IsNever<number>>().toBeFalse(),
      assertType<IsNever<string>>().toBeFalse(),
      assertType<IsNever<'1234'>>().toBeFalse(),
      assertType<IsNever<1234>>().toBeFalse(),
      assertType<IsNever<any>>().toBeFalse(),
      assertType<IsNever<unknown>>().toBeFalse(),
      assertType<IsNever<undefined>>().toBeFalse(),
      assertType<IsNever<null>>().toBeFalse(),
      assertType<IsNever<AnyObject>>().toBeFalse(),
      assertType<IsNever<AnyFunction>>().toBeFalse(),
      assertType<IsNever<bigint>>().toBeFalse(),
      assertType<IsNever<any[]>>().toBeFalse(),
      assertType<IsNever<never[]>>().toBeFalse(),
      assertType<IsNever<symbol>>().toBeFalse(),
    ]);

    testType('if the type is a union that includes never', [
      assertType<IsNever<never | number>>().toBeFalse(),
      assertType<IsNever<never | string>>().toBeFalse(),
    ]);
  });

  describeType('Should returns true', () => {
    testType('if type is of type never', [
      assertType<IsNever<never>>().toBeTrue(),
    ]);

    testType('if the type is an intersection that includes never', [
      assertType<IsNever<never & number>>().toBeTrue(),
      assertType<IsNever<never & string>>().toBeTrue(),
    ]);
  });
});
