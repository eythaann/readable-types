import { IsObject, IsStrictObject, Modify } from '.';
import { AnyFunction, AnyObject } from '../../constants';

describeType('IsObject', () => {
  testType('Should return false if type is not of type object, array or func', [
    assertType<IsObject<number>>().equals(false),
    assertType<IsObject<string>>().equals(false),
    assertType<IsObject<'1234'>>().equals(false),
    assertType<IsObject<1234>>().equals(false),
    assertType<IsObject<any>>().equals(false),
    assertType<IsObject<unknown>>().equals(false),
    assertType<IsObject<undefined>>().equals(false),
    assertType<IsObject<null>>().equals(false),
    assertType<IsObject<never>>().equals(false),
    assertType<IsObject<bigint>>().equals(false),
    assertType<IsObject<symbol>>().equals(false),
  ]);

  testType('Should return true if type is of type object, array or func', [
    assertType<IsObject<AnyObject>>().equals(true),
    assertType<IsObject<any[]>>().equals(true),
    assertType<IsObject<never[]>>().equals(true),
    assertType<IsObject<AnyFunction>>().equals(true),
    assertType<IsObject<{ prop1: string }>>().equals(true),
  ]);
});

describeType('IsStrictObject', () => {
  testType('Should return false if type is not of type object', [
    assertType<IsStrictObject<number>>().equals(false),
    assertType<IsStrictObject<string>>().equals(false),
    assertType<IsStrictObject<'1234'>>().equals(false),
    assertType<IsStrictObject<1234>>().equals(false),
    assertType<IsStrictObject<any>>().equals(false),
    assertType<IsStrictObject<unknown>>().equals(false),
    assertType<IsStrictObject<undefined>>().equals(false),
    assertType<IsStrictObject<null>>().equals(false),
    assertType<IsStrictObject<never>>().equals(false),
    assertType<IsStrictObject<bigint>>().equals(false),
    assertType<IsStrictObject<symbol>>().equals(false),
    assertType<IsStrictObject<any[]>>().equals(false),
    assertType<IsStrictObject<never[]>>().equals(false),
    assertType<IsStrictObject<AnyFunction>>().equals(false),
  ]);

  testType('Should return true if type is of type object', [
    assertType<IsStrictObject<AnyObject>>().equals(true),
    assertType<IsStrictObject<{ prop1: string }>>().equals(true),
  ]);
});

describeType('IsStrictObject', () => {
  testType('Should modify the object', (validator) => {
    type Base = {
      prop1: string;
      prop2: number;
    };

    type expected = {
      prop1: string;
      prop2: number;
      newProp: boolean;
    };

    const expected = { prop1: '123', prop2: 123, newProp: true, newProp2: '123' };

    validator([
      assertType<Modify<Base, { newProp: boolean }>>().equals<expected>(),
      assertType<Modify<Base, { newProp: boolean }>>().isSupertypeOf(expected),
    ]);
  });
});