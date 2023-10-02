import { AnyObject, CanBeEmptyObject, HasProperty, IsObject, IsStrictObject, Modify, ModifyByKey, NoReadonlyKeys, OptionalKeys, PickByValue, Prettify, ReadonlyKeys, RequiredKeys, SomeToPartial, SomeToReadonly, SomeToRequired, SomeToWritable } from './infrastructure';
import { AnyFunction } from '../functions/infrastructure';

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

describeType('CanBeEmptyObject', () => {
  testType('Should handle optional and required properties', [
    assertType<CanBeEmptyObject<{ a?: 'a'; b?: 'b' }>>().equals<true>(),
    assertType<CanBeEmptyObject<{ a?: 'a'; b: 'b' }>>().equals<false>(),
    assertType<CanBeEmptyObject<{}>>().equals<true>(),
    assertType<CanBeEmptyObject<{ a: 'a' }>>().equals<false>(),
  ]);
});

describeType('RequiredKeys', () => {
  testType('Should get the required keys of an object', [
    assertType<RequiredKeys<{ a?: 'a'; b: 'b'; c: 'a' }>>().equals<'b' | 'c'>(),
    assertType<RequiredKeys<{}>>().equals<never>(),
    assertType<RequiredKeys<{ a: 'a' }>>().equals<'a'>(),
    assertType<RequiredKeys<{ a?: 'a'; b?: 'b'; c?: 'c' }>>().equals<never>(),
  ]);
});

describeType('OptionalKeys', () => {
  testType('Should get the optional keys of an object', [
    assertType<OptionalKeys<{ a?: 'a'; b?: 'b'; c: 'a' }>>().equals<'a' | 'b'>(),
    assertType<OptionalKeys<{}>>().equals<never>(),
    assertType<OptionalKeys<{ a: 'a' }>>().equals<never>(),
    assertType<OptionalKeys<{ a?: 'a'; b?: 'b'; c?: 'c' }>>().equals<'a' | 'b' | 'c'>(),
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

    return assertType<ModifyByKey<mainType, overrides, 't'>>().equals<expected>();
  });
});

describeType('HasProperty', () => {
  testType('Should return true when the object has the specified property', () => {
    type TestType = { a: 'a'; b: 'b' };
    assertType<HasProperty<TestType, 'a'>>().equals<true>();
    assertType<HasProperty<TestType, 'b'>>().equals<true>();
  });

  testType('Should return false when the object does not have the specified property', () => {
    type TestType = { a: 'a'; b: 'b' };
    assertType<HasProperty<TestType, 'c'>>().equals<false>();
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
    assertType<ReadonlyKeys<TestObj>>().equals<'b' | 'c'>();
  });

  testType('Should return empty union for objects with all non-readonly properties', () => {
    type TestObj = { a: number; b: string };
    assertType<ReadonlyKeys<TestObj>>().equals<never>();
  });
});

describeType('NoReadonlyKeys', () => {
  testType('Should return keys that are not readonly', () => {
    type TestObj = { a: number; readonly b: string; readonly c: boolean };
    assertType<NoReadonlyKeys<TestObj>>().equals<'a'>();
  });

  testType('Should return empty union for objects with all readonly properties', () => {
    type TestObj = { readonly a: number; readonly b: string };
    assertType<NoReadonlyKeys<TestObj>>().equals<never>();
  });
});