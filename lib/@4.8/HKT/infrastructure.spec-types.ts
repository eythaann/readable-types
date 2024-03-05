import { call } from './infrastructure';

describeType('$', () => {
  testType('Should can be called correctly', () => {
    interface $test extends $<[a: number, b: number]> {
      return: [this[1], this[0]];
    }
    type result = call<$test, [4, 5]>;
    assertType<result>().equals<[5, 4]>();
  });

  testType('Should can be called correctly (named arguments)', () => {
    interface $test extends $<{ a: number; b: number }> {
      return: [this['b'], this['a']];
    }
    type result = call<$test, { a: 4; b: 5 }>;
    assertType<result>().equals<[5, 4]>();
  });

  testType('Should can be called correctly (nested named arguments)', () => {
    interface $test extends $<{ a: { a: number; b: number }; b: number }> {
      return: [this['b'], this['a']['a'], this['a']['b']];
    }
    type result = call<$test, { a: { a: 1; b: 2 }; b: 5 }>;
    assertType<result>().equals<[5, 1, 2]>();
  });

  testType('Should can be called correctly (objects in tuple arguments)', () => {
    interface $test extends $<[arg0: { a: { a: number; b: number }; b: number }]> {
      return: [this[0]['b'], this[0]['a']['a'], this[0]['a']['b']];
    }
    type result = call<$test, [{ a: { a: 1; b: 2 }; b: 5 }]>;
    assertType<result>().equals<[5, 1, 2]>();
  });

  testType('Should return exactly the type that is returning and not interceptions', () => {
    interface deletes {
      deleted: [unknownObject, ...unknownObject[]] | [];
      noDeleted: [unknownObject, ...unknownObject[]] | [];
    }

    interface $test extends $<[arg0: deletes]> {
      return: this[0]['deleted']; // the interface deletes should be not included in the result
    }

    type result = call<$test, [{ deleted: [{ a: string }]; noDeleted: [] }]>;

    assertType<result>().equals<[{ a: string }]>();
  });
});