import { IsObject, IsStrictObject, Modify, ModifyByKey, PickByValue, Prettify } from '.';
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
    assertType<IsStrictObject<AnyFunction>>().equals(false),
  ]);

  testType('Should return true if type is of type object', [
    assertType<IsStrictObject<AnyObject>>().equals(true),
    assertType<IsStrictObject<{ prop1: string }>>().equals(true),
  ]);
});

describeType('Modify', () => {
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

    validator([
      assertType<Modify<Base, { newProp: never }>>().not.equals<Base>(),
      assertType<Modify<Base, { newProp: boolean }>>().equals<expected>(),
      assertType<Modify<Base, { newProp1: boolean }>>().toHaveProperty('newProp1'),
    ]);
  });
});

describeType('Prettify', () => {
  testType('Should return the same type in a simplified form', [
    assertType<Prettify<{ a: string; b: number; c: boolean }>>().equals<{ a: string; b: number; c: boolean }>(),
  ]);
});

describeType('PickByValue', () => {
  testType('Should pick properties whose value types match any in the ValuesToPick array', (validator) => {
    type T1 = { a: string; b: number; c: string | number };
    type T2 = { d: boolean; e: null; f: undefined; g: any; h: never };
    type T3 = { i: { j: string }; k: [number, string] };
    type T4 = { l: symbol; m: bigint };
    type T5 = {};

    validator([
      assertType<PickByValue<T1, [string, number]>>().equals<{ a: string; b: number }>(),
      assertType<PickByValue<T1, [string | number]>>().equals<{ c: string | number }>(),
      assertType<PickByValue<T2, [boolean, null, undefined, any, never]>>().equals<{ d: boolean; e: null; f: undefined; g: any; h: never }>(),
      assertType<PickByValue<T3, [{ j: string }, [number, string]]>>().equals<{ i: { j: string }; k: [number, string] }>(),
      assertType<PickByValue<T4, [symbol, bigint]>>().equals<{ l: symbol; m: bigint }>(),
      assertType<PickByValue<T5, [string]>>().equals<{}>(),
    ]);
  });
});

describeType('ModifyByKey', () => {
  testType('Should create the union type with the keys', () => {
    type mainType = {};

    type overrides = {
      'override1': {};
      'override2': {};
      'override3': {};
    };

    type expected = { t?: undefined } | { t?: 'override1' } | { t?: 'override2' } | { t?: 'override3' };

    return assertType<ModifyByKey<mainType, overrides, 't'>>().equals<expected>();
  });
});