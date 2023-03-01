import { assertType as _assertType } from "./readable-test-types";

declare global {
  var PASS: PASS;
  type PASS = {
    status: "PASS";
  };

  var FAIL: FAIL;
  type FAIL<T extends String = never> = {
    status: "FAIL";
    msg: string;
  };

  function testType(description: string, tests: () => void): void;

  var assertType: typeof _assertType;
}
