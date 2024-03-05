import { getIndexes, isArray, isEmptyArray, isTuple, ObjectToTuple, Pop, PopRecursive, Shift, ShiftRecursive, Tuple, tupleIncludes, UnionToTupleCombination } from './infrastructure';

describeType('IsArray', () => {
  testType('Should return true for array types', [
    assertType<isArray<number[]>>().toBeTrue(),
    assertType<isArray<any[]>>().toBeTrue(),
    assertType<isArray<unknown[]>>().toBeTrue(),
    assertType<isArray<never[]>>().toBeTrue(),
    assertType<isArray<[number, string]>>().toBeTrue(),
  ]);

  testType('Should return false for non-array types', [
    assertType<isArray<number>>().toBeFalse(),
    assertType<isArray<any>>().toBeFalse(),
    assertType<isArray<unknown>>().toBeFalse(),
    assertType<isArray<never>>().toBeFalse(),
  ]);
});

describeType('IsTuple', () => {
  testType('Should return true for tuple types', [
    assertType<isTuple<[number, string]>>().toBeTrue(),
    assertType<isTuple<[any, any]>>().toBeTrue(),
    assertType<isTuple<[unknown, unknown]>>().toBeTrue(),
    assertType<isTuple<[never, never]>>().toBeTrue(),
  ]);

  testType('Should return false for non-tuple types', [
    assertType<isTuple<number[]>>().toBeFalse(),
    assertType<isTuple<any[]>>().toBeFalse(),
    assertType<isTuple<unknown[]>>().toBeFalse(),
    assertType<isTuple<never[]>>().toBeFalse(),
    assertType<isTuple<never>>().toBeFalse(),
    assertType<isTuple<any>>().toBeFalse(),
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
    assertType<isEmptyArray<[]>>().toBeTrue(),
    assertType<isEmptyArray<[1, 2, 3]>>().toBeFalse(),
    assertType<isEmptyArray<string[]>>().toBeFalse(),
    assertType<isEmptyArray<unknown[]>>().toBeFalse(),
    assertType<isEmptyArray<[unknown]>>().toBeFalse(),
    assertType<isEmptyArray<never[]>>().toBeFalse(),
    assertType<isEmptyArray<[never]>>().toBeFalse(),
    assertType<isEmptyArray<any[]>>().toBeFalse(),
    assertType<isEmptyArray<[any]>>().toBeFalse(),
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
    type indices = getIndexes<[string, number, boolean]>;
    return assertType<indices>().equals<'0' | '1' | '2'>();
  });

  testType('Should return never for an empty tuple', () => {
    type indices = getIndexes<[]>;
    return assertType<indices>().toBeNever();
  });

  testType('Should correctly extract indexes from a mixed type tuple', () => {
    type indices = getIndexes<[string, number, boolean, ...string[]]>;
    return assertType<indices>().equals<'0' | '1' | '2'>();
  });
});

describeType('TupleIncludes', () => {
  testType('Should return true if the tuple includes the specified type', () => {
    type TestTuple = [number, string, boolean];
    assertType<tupleIncludes<TestTuple, string>>().toBeTrue();
  });

  testType('Should return false if the tuple does not include the specified type', () => {
    type TestTuple = [number, string, boolean];
    assertType<tupleIncludes<TestTuple, object>>().toBeFalse();
  });

  testType('Should return false for an empty tuple', () => {
    type TestTuple = [];
    assertType<tupleIncludes<TestTuple, any>>().toBeFalse();
  });
});

describeType('ObjectToTuple', () => {
  testType('Should create a tuple', () => {
    type result = ObjectToTuple<{ 0: string; 1: number }>;
    assertType<result>().equals<[string, number]>();
  });

  testType('Should create an empty tuple', () => {
    type result = ObjectToTuple<{}>;
    assertType<result>().equals<[]>();
  });

  testType('Should ignore indexers of no type number', () => {
    type result = ObjectToTuple<{ 0: string; ignored: 'test'; 1: number }>;
    assertType<result>().equals<[string, number]>();
  });
});