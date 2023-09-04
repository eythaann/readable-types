import { IsNever } from '.';
import { AnyFunction } from '../functions';
import { AnyObject } from '../objects';

describeType('IsNever', () => {
  describeType('Should returns false', () => {
    testType('if type is not of type never', [
      assertType<IsNever<number>>().equals(false),
      assertType<IsNever<string>>().equals(false),
      assertType<IsNever<'1234'>>().equals(false),
      assertType<IsNever<1234>>().equals(false),
      assertType<IsNever<any>>().equals(false),
      assertType<IsNever<unknown>>().equals(false),
      assertType<IsNever<undefined>>().equals(false),
      assertType<IsNever<null>>().equals(false),
      assertType<IsNever<AnyObject>>().equals(false),
      assertType<IsNever<AnyFunction>>().equals(false),
      assertType<IsNever<bigint>>().equals(false),
      assertType<IsNever<any[]>>().equals(false),
      assertType<IsNever<never[]>>().equals(false),
      assertType<IsNever<symbol>>().equals(false),
    ]);

    testType('if the type is a union that includes never', [
      assertType<IsNever<never | number>>().equals(false),
      assertType<IsNever<never | string>>().equals(false),
    ]);
  });

  describeType('Should returns true', () => {
    testType('if type is of type never', [
      assertType<IsNever<never>>().equals(true),
    ]);

    testType('if the type is an intersection that includes never', [
      assertType<IsNever<never & number>>().equals(true),
      assertType<IsNever<never & string>>().equals(true),
    ]);
  });
});
