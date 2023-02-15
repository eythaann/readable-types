import { If } from "./utils/conditions";
import { IsNever } from "./utils/never";
import { FailMessage } from './readable-test-types/messages'
import { Equals } from "./utils/comparison";
import { IsUndefined } from "./utils/undefined";

declare global {
  var PASS: PASS;
  type PASS = {
    status: 'PASS';
  }

  var FAIL: FAIL;
  type FAIL<T extends String = never> = {
    status: 'FAIL';
    msg: string;
  }

  /**
   *Internal Namespace for readable-types not recommended to be used directly
   */
  namespace rt {
    type a = boolean;
  }

  function testType(description: string, tests: () => void): void;

  function assertType<const T>(): {
    equals: <const U>(should: If<Equals<T, U>, PASS, FAIL<FailMessage['notEqual']>>) => void;
    toBeNever: (should: If<IsNever<T>, PASS, FAIL<FailMessage['isNotNever']>>) => void;
    toBeUndefined: (should: If<IsUndefined<T>, PASS, FAIL<FailMessage['isNotNever']>>) => void;

    length: T extends unknown[]
    ? Equals<T['length'], number> extends true ? 'infinity' : T['length']
    : FAIL<"'expect' type do not have property of type length">
  }
}
