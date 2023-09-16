import { AnyObject } from './modules';
import { IValidations, TestsCallback } from './readable-test-types';

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: AnyObject | TestsCallback): void;
  function assertType<T>(): IValidations<T>;

  interface RT_CONFIG {}
}