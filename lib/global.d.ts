import { AnyObject } from './modules';
import { IValidations, TestsCallback } from './readable-test-types';

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: AnyObject | TestsCallback): void;
  function assertType<T>(): IValidations<T>;

  interface RT_CONFIG {}

  type RT_CONFIG_SCHEME<T extends {
    development?: boolean;
    ifConditionWay?: 'singleLine' | 'natural' | 'explicit'; // future 2.0
  }> = T;
}