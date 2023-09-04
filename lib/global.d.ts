import { TestsCallback, AssertsCollection, IValidations } from './readable-test-types';

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: AssertsCollection | TestsCallback): void;
  function assertType<T>(): IValidations<T>;
}