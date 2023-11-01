import { $ } from '../generals/HKT/domain';
import { add, equals, TupleFind, TupleReduce, UnionMap } from '../infrastructure';
import { TupleMap } from './infrastructure';

describeType('TupleMap', () => {
  interface $callback extends $<[current: number]> {
    return: `${this['0']}`;
  }

  testType('Should correctly map each number in a tuple to its string representation', () => {
      type result = TupleMap<[1, 2, 3, 4, 5], $callback>;
      assertType<result>().equals<['1', '2', '3', '4', '5']>();
  });

  testType('Should handle empty tuples', () => {
      type result = TupleMap<[], $callback>;
      assertType<result>().equals<[]>();
  });
});

describeType('TupleReduce', () => {
  interface $callback extends $<[acc: number, current: number]> {
    return: add<this['0'], this['1']>;
  }

  testType('Should correctly reduce a tuple of numbers to their sum', () => {
    type result = TupleReduce<[1, 2, 3, 4, 5], $callback, 0>;
    assertType<result>().equals<15>();
  });

  testType('Should return the initial value for empty tuples', () => {
    type result = TupleReduce<[], $callback, 0>;
    assertType<result>().equals<0>();
  });
});

describeType('TupleFind', () => {
  testType('Should correctly find the string "ab" in a tuple', () => {
    interface $callback extends $<[current: number | string]> {
      return: equals<this['0'], 'ab'>;
    }
    type result = TupleFind<[1, 2, 3, 4, 'ab', 6], $callback>;
    assertType<result>().equals<'ab'>();
  });

  testType('Should return never if the item is not found', () => {
    interface $callback extends $<[current: number | string]> {
      return: equals<this['0'], 'not-found'>;
    }
    type result = TupleFind<[1, 2, 3, 4, 'ab', 6], $callback>;
    assertType<result>().toBeNever();
  });
});

describeType('UnionMap', () => {
  interface $callback extends $<[current: number]> {
    return: `${this[0]}`;
  }

  testType('Should correctly map each number in a union to its string representation', () => {
    type result = UnionMap<1 | 2 | 3 | 4 | 5, $callback>;
    assertType<result>().equals<'1' | '2' | '3' | '4' | '5'>();
  });

  testType('Should handle unions with a single type', () => {
    type result = UnionMap<1, $callback>;
    assertType<result>().equals<'1'>();
  });
});
