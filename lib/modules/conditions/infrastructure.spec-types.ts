import { ExplicitCondition } from './app';

describeType('If', () => {
  testType('Should use true case', () => {
    assertType<ExplicitCondition<{ condition: true; then: string; else: number }>>().equals<string>();
    assertType<ExplicitCondition<{ condition: boolean; then: string; else: number }>>().equals<string>();
  });

  testType('Should return false case', () => {
    assertType<ExplicitCondition<{ condition: false; then: string; else: number }>>().equals<string>();
    assertType<ExplicitCondition<{ condition: never; then: string; else: number }>>().equals<number>();
  });
});
