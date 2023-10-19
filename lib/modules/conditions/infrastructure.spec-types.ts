import { ExplicitCondition } from './app';

describeType('If', () => {
  testType('Should use condition object', () => {
    assertType<ExplicitCondition<{ condition: true; then: string; else: number }>>().equals<string>();
    assertType<ExplicitCondition<{ condition: false; then: string; else: number }>>().equals<number>();
    assertType<ExplicitCondition<{ condition: boolean; then: string; else: number }>>().equals<string>();
  });
});