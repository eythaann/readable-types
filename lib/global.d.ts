import { IValidations, TestsCallback } from './readable-test-types';

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: TestsCallback): void;
  function assertType<T>(): IValidations<T>;

  interface RT_CONFIG {}

  type RT_CONFIG_SCHEME<T extends {
    development?: boolean;
    conditionWay?: 'singleLine' | 'natural' | 'explicit'; // future 2.0
  }> = T;
}