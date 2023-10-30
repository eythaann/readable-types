import { defaultOnUnknown, isUnknown } from './infrastructure';

describeType('IsUnknown', () => {
  testType('Should return true only for type unknown', [
    assertType<isUnknown<unknown>>().toBeTrue(),
    assertType<isUnknown<unknown | string>>().toBeTrue(), // union with "unknown" resolves to "unknown"
  ]);

  testType('Should return false for all other types', [
    assertType<isUnknown<any>>().toBeFalse(),
    assertType<isUnknown<string>>().toBeFalse(),
    assertType<isUnknown<number>>().toBeFalse(),
    assertType<isUnknown<{}>>().toBeFalse(),
    assertType<isUnknown<any[]>>().toBeFalse(),
    assertType<isUnknown<never>>().toBeFalse(),
    assertType<isUnknown<unknown & string>>().toBeFalse(),
  ]);

  describeType('DefaultOnUnknown', () => {
    testType('Should replace unknown type with the default type', () => {
      type result = defaultOnUnknown<unknown, string>;
      assertType<result>().equals<string>();
    });

    testType('Should retain the original type if it is known', () => {
      type result = defaultOnUnknown<number, string>;
      assertType<result>().equals<number>();
    });
  });
});