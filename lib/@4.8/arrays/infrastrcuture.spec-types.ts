import { ObjectToTuple } from './infrastructure';

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