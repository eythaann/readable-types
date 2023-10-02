import { If } from './infrastructure';

describeType('If', () => {
  testType('Should return TrueCase if Condition is true', [
    assertType<If<true, string, number>>().equals<string>(),
    assertType<If<true, '1234', 1234>>().equals<'1234'>(),
    assertType<If<true, any, unknown>>().toBeAny(),
  ]);

  testType('Should return FalseCase if Condition is false', [
    assertType<If<false, string, number>>().equals<number>(),
    assertType<If<false, '1234', 1234>>().equals<1234>(),
    assertType<If<false, any, unknown>>().toBeUnknow(),
  ]);

  testType('Should return TrueCase | FalseCase if Condition is boolean', [
    assertType<If<boolean, string, number>>().equals<string | number>(),
    assertType<If<boolean, '1234', 1234>>().equals<'1234' | 1234>(),
    assertType<If<boolean, any, unknown>>().toBeAny(), // in this case any | unknown resolve it as any
  ]);

  testType('Should use condition object (variant 1)', [
    assertType<If<{ condition: true; type: string; else: number }>>().equals<string>(),
    assertType<If<{ condition: false; type: string; else: number }>>().equals<number>(),
    assertType<If<{ condition: boolean; type: string; else: number }>>().equals<string | number>(),
  ]);
});