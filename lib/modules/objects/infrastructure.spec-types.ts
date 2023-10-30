import { canBeEmptyObject, hasProperty, isObject, isStrictObject, modify, modifyByKey, noReadonlyKeys, optionalKeys, PickByValue, prettify, readonlyKeys, requiredKeys, SomeToPartial, SomeToReadonly, SomeToRequired, SomeToWritable } from './infrastructure';

describeType('IsObject', () => {
  testType('Should return false if type is not of type object, array or func', [
    assertType<isObject<number>>().toBeFalse(),
    assertType<isObject<string>>().toBeFalse(),
    assertType<isObject<'1234'>>().toBeFalse(),
    assertType<isObject<1234>>().toBeFalse(),
    assertType<isObject<any>>().toBeFalse(),
    assertType<isObject<unknown>>().toBeFalse(),
    assertType<isObject<undefined>>().toBeFalse(),
    assertType<isObject<null>>().toBeFalse(),
    assertType<isObject<never>>().toBeFalse(),
    assertType<isObject<bigint>>().toBeFalse(),
    assertType<isObject<symbol>>().toBeFalse(),
  ]);

  testType('Should return true if type is of type object, array or func', [
    assertType<isObject<anyObject>>().toBeTrue(),
    assertType<isObject<any[]>>().toBeTrue(),
    assertType<isObject<never[]>>().toBeTrue(),
    assertType<isObject<anyFunction>>().toBeTrue(),
    assertType<isObject<{ prop1: string }>>().toBeTrue(),
  ]);
});

describeType('IsStrictObject', () => {
  testType('Should return false if type is not of type object', [
    assertType<isStrictObject<number>>().toBeFalse(),
    assertType<isStrictObject<string>>().toBeFalse(),
    assertType<isStrictObject<'1234'>>().toBeFalse(),
    assertType<isStrictObject<1234>>().toBeFalse(),
    assertType<isStrictObject<any>>().toBeFalse(),
    assertType<isStrictObject<unknown>>().toBeFalse(),
    assertType<isStrictObject<undefined>>().toBeFalse(),
    assertType<isStrictObject<null>>().toBeFalse(),
    assertType<isStrictObject<never>>().toBeFalse(),
    assertType<isStrictObject<bigint>>().toBeFalse(),
    assertType<isStrictObject<symbol>>().toBeFalse(),
    assertType<isStrictObject<any[]>>().toBeFalse(),
    assertType<isStrictObject<never[]>>().toBeFalse(),
    assertType<isStrictObject<anyFunction>>().toBeFalse(),
    assertType<isStrictObject<() => any>>().toBeFalse(),
  ]);

  testType('Should return true if type is of type object', [
    assertType<isStrictObject<anyObject>>().toBeTrue(),
    assertType<isStrictObject<{ prop1: string }>>().toBeTrue(),
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
      assertType<modify<Base, { newProp: never }>>().not.equals<Base>(),
      assertType<modify<Base, { newProp: boolean }>>().equals<expected>(),
      assertType<modify<Base, { newProp1: boolean }>>().toHaveProperty('newProp1'),
    ]);
  });
});

describeType('Prettify', () => {
  testType('Should return the same type in a simplified form', [
    assertType<prettify<{ a: string; b: number; c: boolean }>>().equals<{ a: string; b: number; c: boolean }>(),
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

describeType('CanBeEmptyObject', () => {
  testType('Should handle optional and required properties', [
    assertType<canBeEmptyObject<{ a?: 'a'; b?: 'b' }>>().toBeTrue(),
    assertType<canBeEmptyObject<{ a?: 'a'; b: 'b' }>>().toBeFalse(),
    assertType<canBeEmptyObject<{}>>().toBeTrue(),
    assertType<canBeEmptyObject<{ a: 'a' }>>().toBeFalse(),
  ]);
});

describeType('RequiredKeys', () => {
  testType('Should get the required keys of an object', [
    assertType<requiredKeys<{ a?: 'a'; b: 'b'; c: 'a' }>>().equals<'b' | 'c'>(),
    assertType<requiredKeys<{}>>().toBeNever(),
    assertType<requiredKeys<{ a: 'a' }>>().equals<'a'>(),
    assertType<requiredKeys<{ a?: 'a'; b?: 'b'; c?: 'c' }>>().toBeNever(),
  ]);
});

describeType('OptionalKeys', () => {
  testType('Should get the optional keys of an object', [
    assertType<optionalKeys<{ a?: 'a'; b?: 'b'; c: 'a' }>>().equals<'a' | 'b'>(),
    assertType<optionalKeys<{}>>().toBeNever(),
    assertType<optionalKeys<{ a: 'a' }>>().toBeNever(),
    assertType<optionalKeys<{ a?: 'a'; b?: 'b'; c?: 'c' }>>().equals<'a' | 'b' | 'c'>(),
  ]);
});

describeType('ModifyByKey', () => {
  testType('Should create the union type with the keys', () => {
    type mainType = {};

    type overrides = {
      'override1': {};
      'override2': {};
      'override3': {};
    };

    type expected = { t?: undefined } | { t: 'override1' } | { t: 'override2' } | { t: 'override3' };

    return assertType<modifyByKey<mainType, overrides, 't'>>().equals<expected>();
  });
});

describeType('HasProperty', () => {
  testType('Should return true when the object has the specified property', () => {
    type TestType = { a: 'a'; b: 'b' };
    assertType<hasProperty<TestType, 'a'>>().toBeTrue();
    assertType<hasProperty<TestType, 'b'>>().toBeTrue();
  });

  testType('Should return false when the object does not have the specified property', () => {
    type TestType = { a: 'a'; b: 'b' };
    assertType<hasProperty<TestType, 'c'>>().toBeFalse();
  });
});

describeType('Type Modifiers', () => {
  testType('SomeToReadonly should make specified keys readonly', () => {
    type TestType = { a: number; b: string; c: boolean };
    type expected = { readonly a: number; b: string; c: boolean };
    assertType<SomeToReadonly<TestType, 'a'>>().equals<expected>();
  });

  testType('SomeToWritable should make specified keys writable', () => {
    type TestType = { readonly a: number; b: string; readonly c: boolean };
    type expected = { a: number; b: string; readonly c: boolean };
    assertType<SomeToWritable<TestType, 'a'>>().equals<expected>();
  });

  testType('SomeToPartial should make specified keys optional', () => {
    type TestType = { a: number; b: string; c: boolean };
    type expected = { a?: number; b: string; c: boolean };
    assertType<SomeToPartial<TestType, 'a'>>().equals<expected>();
  });

  testType('SomeToRequired should make specified keys required', () => {
    type TestType = { a?: number; b: string; c?: boolean };
    type expected = { a: number; b: string; c?: boolean };
    assertType<SomeToRequired<TestType, 'a'>>().equals<expected>();
  });
});

describeType('ReadonlyKeys', () => {
  testType('Should return readonly keys', () => {
    type TestObj = { a: number; readonly b: string; readonly c: boolean };
    assertType<readonlyKeys<TestObj>>().equals<'b' | 'c'>();
  });

  testType('Should return empty union for objects with all non-readonly properties', () => {
    type TestObj = { a: number; b: string };
    assertType<readonlyKeys<TestObj>>().toBeNever();
  });
});

describeType('NoReadonlyKeys', () => {
  testType('Should return keys that are not readonly', () => {
    type TestObj = { a: number; readonly b: string; readonly c: boolean };
    assertType<noReadonlyKeys<TestObj>>().equals<'a'>();
  });

  testType('Should return empty union for objects with all readonly properties', () => {
    type TestObj = { readonly a: number; readonly b: string };
    assertType<noReadonlyKeys<TestObj>>().toBeNever();
  });
});