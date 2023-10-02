import { ExplicitCondition, NaturalCondition, SingleLineCondition } from './app';

describeType('If', () => {
  testType('Should return TrueCase if Condition is true', [
    assertType<SingleLineCondition<true, string, number>>().equals<string>(),
    assertType<SingleLineCondition<true, '1234', 1234>>().equals<'1234'>(),
    assertType<SingleLineCondition<true, any, unknown>>().toBeAny(),
  ]);

  testType('Should return FalseCase if Condition is false', [
    assertType<SingleLineCondition<false, string, number>>().equals<number>(),
    assertType<SingleLineCondition<false, '1234', 1234>>().equals<1234>(),
    assertType<SingleLineCondition<false, any, unknown>>().toBeUnknow(),
  ]);

  testType('Should return TrueCase if Condition is boolean', [
    assertType<SingleLineCondition<boolean, string, number>>().equals<string>(),
    assertType<SingleLineCondition<boolean, '1234', 1234>>().equals<'1234'>(),
    assertType<SingleLineCondition<boolean, any, unknown>>().toBeAny(),
  ]);

  testType('Should use condition object', [
    assertType<ExplicitCondition<{ condition: true; then: string; else: number }>>().equals<string>(),
    assertType<ExplicitCondition<{ condition: false; then: string; else: number }>>().equals<number>(),
    assertType<ExplicitCondition<{ condition: boolean; then: string; else: number }>>().equals<string>(),
  ]);

  testType('Should use Natural condition object', [
    assertType<NaturalCondition<true, { then: string; else: number }>>().equals<string>(),
    assertType<NaturalCondition<false, { then: string; else: number }>>().equals<number>(),
    assertType<NaturalCondition<boolean, { then: string; else: number }>>().equals<string>(),
  ]);
});