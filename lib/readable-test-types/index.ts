import { If } from "../utils/conditions";
import { IsNever } from "../utils/never";
import { FailMessage } from "./messages";
import { Equals } from "../utils/comparison";
import { IsNull, IsUndefined } from "../utils/undefined";
import { IsObject, IsStrictObject } from "../utils/objects";

export type AssertsCollection = { [testName: string]: PASS } | PASS[];

export type TestsCallback = (validator: (asserts: AssertsCollection) => never) => void | AssertsCollection;

export function assertType<const T>() {

  interface INotValidations {
    equals: <const U>(v?: U) => If<Equals<T, U>, FAIL<FailMessage['notEqual']>, PASS>;
    assignableTo: <const U>(value?: U) => U extends T ? FAIL : PASS;
  }


  interface IValidations {
    not: INotValidations;
    
    equals: <const U>(v?: U) => If<Equals<T, U>, PASS, FAIL<FailMessage['notEqual']>>;

    assignableTo: <const U>(value?: U) => U extends T ? PASS : FAIL;

    /** Type should be "never" */
    toBeNever: (should: If<IsNever<T>, PASS, FAIL<FailMessage['isNotNever']>>) => never;

    /** Type should be "undefined" */
    toBeUndefined: (should: If<IsUndefined<T>, PASS, FAIL<FailMessage['isNotUndefined']>>) => never;

    /** Type should be "null" */
    toBeNull: (should: If<IsNull<T>, PASS, FAIL<FailMessage['isNotUndefined']>>) => never;

    /** Type should extends of Object, Array or Function */
    toBeObject: (should: If<IsObject<T>, PASS, FAIL<FailMessage['isNotObject']>>) => never;

    /** Type should extends only of Objects */
    toBeStrictObject: (should: If<IsStrictObject<T>, PASS, FAIL<FailMessage['isNotObject']>>) => never;

    length: T extends unknown[]
    ? Equals<T['length'], number> extends true ? 'infinity' : T['length']
    : FAIL<"'expect' type do not have property of type length">
  }

  return {} as IValidations;
}