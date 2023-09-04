import { TestsCallback, AssertsCollection, IValidations } from './readable-test-types';

declare global {
  var PASS: PASS;
  type PASS = {
    status: 'PASS';
  };

  var FAIL: FAIL;
  type FAIL<_T extends string = 'No Message'> = {
    status: 'FAIL';
    msg: string;
  };

  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: AssertsCollection | TestsCallback): void;
  function assertType<T>(): IValidations<T>;
}