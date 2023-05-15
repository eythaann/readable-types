import { IsArray, IsTuple, Tuple } from '.';

describeType('IsArray', () => {
  testType('Should return true for array types', [
    assertType<IsArray<number[]>>().equals<true>(),
    assertType<IsArray<any[]>>().equals<true>(),
    assertType<IsArray<unknown[]>>().equals<true>(),
    assertType<IsArray<never[]>>().equals<true>(),
    assertType<IsArray<[number, string]>>().equals<true>(),
  ]);

  testType('Should return false for non-array types', [
    assertType<IsArray<number>>().equals<false>(),
    assertType<IsArray<any>>().equals<false>(),
    assertType<IsArray<unknown>>().equals<false>(),
    assertType<IsArray<never>>().equals<false>(),
  ]);
});

describeType('IsTuple', () => {
  testType('Should return true for tuple types', [
    assertType<IsTuple<[number, string]>>().equals<true>(),
    assertType<IsTuple<[any, any]>>().equals<true>(),
    assertType<IsTuple<[unknown, unknown]>>().equals<true>(),
    assertType<IsTuple<[never, never]>>().equals<true>(),
  ]);

  testType('Should return false for non-tuple types', [
    assertType<IsTuple<number[]>>().equals<false>(),
    assertType<IsTuple<any[]>>().equals<false>(),
    assertType<IsTuple<unknown[]>>().equals<false>(),
    assertType<IsTuple<never[]>>().equals<false>(),
  ]);
});

describeType('Tuple', () => {
  testType('Should generate tuples of the correct length and type', [
    assertType<Tuple<number, 3>>().equals<[number, number, number]>(),
    assertType<Tuple<any, 2>>().equals<[any, any]>(),
    assertType<Tuple<unknown, 1>>().equals<[unknown]>(),
    assertType<Tuple<never, 0>>().equals<[]>(),
  ]);
});