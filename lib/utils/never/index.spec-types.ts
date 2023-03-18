import { IsNever } from '.';
import { AnyFunction, AnyObject } from '../../constants';

describeType('IsNever', () => {
  testType('Should return false if type is not of type never', [
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

  testType('Should return true if type is of type never', [
    assertType<IsNever<never>>().equals(true),
    assertType<IsNever<never>>().not.equals(false),
  ]);
});