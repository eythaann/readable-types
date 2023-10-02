import { IsArray, IsEmptyArray, IsTuple, Pop, PopRecursive, Shift, ShiftRecursive, Tuple, getTupleIndexes, UnionToTupleCombination, TupleIncludes } from './infrastructure';

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
    assertType<IsTuple<never>>().equals<false>(),
    assertType<IsTuple<any>>().equals<false>(),
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

describeType('IsEmptyArray', () => {
  testType('Should return true for empty arrays and false for non-empty arrays', [
    assertType<IsEmptyArray<[]>>().equals<true>(),
    assertType<IsEmptyArray<[1, 2, 3]>>().equals<false>(),
    assertType<IsEmptyArray<string[]>>().equals<false>(),
    assertType<IsEmptyArray<unknown[]>>().equals<false>(),
    assertType<IsEmptyArray<[unknown]>>().equals<false>(),
    assertType<IsEmptyArray<never[]>>().equals<false>(),
    assertType<IsEmptyArray<[never]>>().equals<false>(),
    assertType<IsEmptyArray<any[]>>().equals<false>(),
    assertType<IsEmptyArray<[any]>>().equals<false>(),
  ]);
});

describeType('Shift', () => {
  testType('Should shift tuple', [
    assertType<Shift<[1, 2, 3]>>().equals<[2, 3]>(),
    assertType<Shift<[2, 3]>>().equals<[3]>(),
    assertType<Shift<[3]>>().equals<[]>(),
  ]);
});

describeType('Pop', () => {
  testType('Should pop tuple', [
    assertType<Pop<[1, 2, 3]>>().equals<[1, 2]>(),
    assertType<Pop<[1, 2]>>().equals<[1]>(),
    assertType<Pop<[1]>>().equals<[]>(),
  ]);
});

describeType('ShiftRecursive', () => {
  testType('Should shift tuple recursively', [
    assertType<ShiftRecursive<[1, 2, 3], 0>>().equals<[] | [2, 3] | [3]>(),
  ]);
});

describeType('PopRecursive', () => {
  testType('Should pop tuple recursively', [
    assertType<PopRecursive<[1, 2, 3], 0>>().equals<[1, 2] | [1] | []>(),
  ]);
});

describeType('UnionToTupleCombination', () => {
  testType('Should convert union to tuple', [
    assertType<UnionToTupleCombination<'a' | 'b'>>().equals<['a', 'b'] | ['b', 'a']>(),
  ]);
});

describeType('getTupleIndexes', () => {
  testType('Should correctly extract indexes from a tuple of known length', () => {
    type indices = getTupleIndexes<[string, number, boolean]>;
    return assertType<indices>().equals<'0' | '1' | '2'>();
  });

  testType('Should return never for an empty tuple', () => {
    type indices = getTupleIndexes<[]>;
    return assertType<indices>().equals<never>();
  });

  testType('Should correctly extract indexes from a mixed type tuple', () => {
    type indices = getTupleIndexes<[string, number, boolean, ...string[]]>;
    return assertType<indices>().equals<'0' | '1' | '2'>();
  });
});

describeType('TupleIncludes', () => {
  testType('Should return true if the tuple includes the specified type', () => {
    type TestTuple = [number, string, boolean];
    assertType<TupleIncludes<TestTuple, string>>().toBeTrue();
  });

  testType('Should return false if the tuple does not include the specified type', () => {
    type TestTuple = [number, string, boolean];
    assertType<TupleIncludes<TestTuple, object>>().toBeFalse();
  });

  testType('Should return false for an empty tuple', () => {
    type TestTuple = [];
    assertType<TupleIncludes<TestTuple, any>>().toBeFalse();
  });
});