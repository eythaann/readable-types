import { If } from "../utils/conditions";
import { IsNever } from "../utils/never";
import { FailMessage } from "./messages";
import { Equals } from "../utils/comparison";
import { IsNull, IsUndefined } from "../utils/undefined";
import { IsObject, IsStrictObject } from "../utils/objects";

export function assertType<const T>() {
  interface IValidations {
    equals: <const U>(should: If<Equals<T, U>, PASS, FAIL<FailMessage['notEqual']>>) => this;

    /** Type should be "never" */
    toBeNever: (should: If<IsNever<T>, PASS, FAIL<FailMessage['isNotNever']>>) => this;

    /** Type should be "undefined" */
    toBeUndefined: (should: If<IsUndefined<T>, PASS, FAIL<FailMessage['isNotUndefined']>>) => this;

    /** Type should be "null" */
    toBeNull: (should: If<IsNull<T>, PASS, FAIL<FailMessage['isNotUndefined']>>) => this;

    /** Type should extends of Object, Array or Function */
    toBeObject: (should: If<IsObject<T>, PASS, FAIL<FailMessage['isNotObject']>>) => this;

    /** Type should extends only of Objects */
    toBeStrictObject: (should: If<IsStrictObject<T>, PASS, FAIL<FailMessage['isNotObject']>>) => this;

    length: T extends unknown[]
    ? Equals<T['length'], number> extends true ? 'infinity' : T['length']
    : FAIL<"'expect' type do not have property of type length">
  }

  return {} as IValidations;
}