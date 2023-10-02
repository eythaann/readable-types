import { IsNumber } from './infrastructure';
import { AnyFunction } from '../functions/infrastructure';
import { AnyObject } from '../objects/infrastructure';

describeType('IsNumber', () => {
  testType('Should return false if type is not a number', [
    assertType<IsNumber<string>>().equals(false),
    assertType<IsNumber<'1234'>>().equals(false),
    assertType<IsNumber<any>>().equals(false),
    assertType<IsNumber<unknown>>().equals(false),
    assertType<IsNumber<undefined>>().equals(false),
    assertType<IsNumber<null>>().equals(false),
    assertType<IsNumber<AnyObject>>().equals(false),
    assertType<IsNumber<AnyFunction>>().equals(false),
    assertType<IsNumber<bigint>>().equals(false),
    assertType<IsNumber<any[]>>().equals(false),
    assertType<IsNumber<never[]>>().equals(false),
    assertType<IsNumber<symbol>>().equals(false),
    assertType<IsNumber<never>>().equals(false),
    assertType<IsNumber<string | number>>().equals(false),
    assertType<IsNumber<number & string>>().equals(false),
  ]);

  testType('Should return true if type is a number', [
    assertType<IsNumber<number>>().equals(true),
    assertType<IsNumber<1234>>().equals(true),
    assertType<IsNumber<number | never>>().equals(true),
  ]);
});