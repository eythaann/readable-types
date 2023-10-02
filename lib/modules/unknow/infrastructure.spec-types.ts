import { DefaultOnUnknown, IsUnknown } from './infrastructure';

describeType('IsUnknown', () => {
  testType('Should return true only for type unknown', [
    assertType<IsUnknown<unknown>>().toBeTrue(),
    assertType<IsUnknown<unknown | string>>().toBeTrue(), // union with "unknown" resolves to "unknown"
  ]);

  testType('Should return false for all other types', [
    assertType<IsUnknown<any>>().toBeFalse(),
    assertType<IsUnknown<string>>().toBeFalse(),
    assertType<IsUnknown<number>>().toBeFalse(),
    assertType<IsUnknown<{}>>().toBeFalse(),
    assertType<IsUnknown<any[]>>().toBeFalse(),
    assertType<IsUnknown<never>>().toBeFalse(),
    assertType<IsUnknown<unknown & string>>().toBeFalse(),
  ]);

  describeType('DefaultOnUnknown', () => {
    testType('Should replace unknown type with the default type', () => {
      type result = DefaultOnUnknown<unknown, string>;
      assertType<result>().equals<string>();
    });

    testType('Should retain the original type if it is known', () => {
      type result = DefaultOnUnknown<number, string>;
      assertType<result>().equals<number>();
    });
  });
});