import { IsArray, IsEmptyArray, IsTuple, Pop, PopRecursive, Shift, ShiftRecursive, Tuple, getTupleIndexes, UnionToTupleCombination, TupleIncludes } from './infrastructure';

describeType('IsArray', () => {
  testType('Should return true for array types', [
    assertType<IsArray<number[]>>().toBeTrue(),
    assertType<IsArray<any[]>>().toBeTrue(),
    assertType<IsArray<unknown[]>>().toBeTrue(),
    assertType<IsArray<never[]>>().toBeTrue(),
    assertType<IsArray<[number, string]>>().toBeTrue(),
  ]);

  testType('Should return false for non-array types', [
    assertType<IsArray<number>>().toBeFalse(),
    assertType<IsArray<any>>().toBeFalse(),
    assertType<IsArray<unknown>>().toBeFalse(),
    assertType<IsArray<never>>().toBeFalse(),
  ]);
});

describeType('IsTuple', () => {
  testType('Should return true for tuple types', [
    assertType<IsTuple<[number, string]>>().toBeTrue(),
    assertType<IsTuple<[any, any]>>().toBeTrue(),
    assertType<IsTuple<[unknown, unknown]>>().toBeTrue(),
    assertType<IsTuple<[never, never]>>().toBeTrue(),
  ]);

  testType('Should return false for non-tuple types', [
    assertType<IsTuple<number[]>>().toBeFalse(),
    assertType<IsTuple<any[]>>().toBeFalse(),
    assertType<IsTuple<unknown[]>>().toBeFalse(),
    assertType<IsTuple<never[]>>().toBeFalse(),
    assertType<IsTuple<never>>().toBeFalse(),
    assertType<IsTuple<any>>().toBeFalse(),
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
    assertType<IsEmptyArray<[]>>().toBeTrue(),
    assertType<IsEmptyArray<[1, 2, 3]>>().toBeFalse(),
    assertType<IsEmptyArray<string[]>>().toBeFalse(),
    assertType<IsEmptyArray<unknown[]>>().toBeFalse(),
    assertType<IsEmptyArray<[unknown]>>().toBeFalse(),
    assertType<IsEmptyArray<never[]>>().toBeFalse(),
    assertType<IsEmptyArray<[never]>>().toBeFalse(),
    assertType<IsEmptyArray<any[]>>().toBeFalse(),
    assertType<IsEmptyArray<[any]>>().toBeFalse(),
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
    return assertType<indices>().toBeNever();
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