import { If } from "../utils/conditions";
import { IsNever } from "../utils/never";
import { FailMessage } from "./messages";
import { Equals, IsSubType, IsSuperType } from "../utils/comparison";
import { IsNull, IsUndefined } from "../utils/undefined";
import { IsObject, IsStrictObject } from "../utils/objects";
import { UnionType } from "typescript";
import { And, Not } from "../utils/booleans";
import { AnyFunction } from "../constants";

type InvertIf<Condition extends boolean, ToBeInverted extends boolean> = If<Condition, Not<ToBeInverted>, ToBeInverted>

export interface IValidations<T, Invert extends boolean = false> {
  not: IValidations<T, true>;

  /** asserting type should be the same type as the expected */
  equals: <const U>(value?: U) => If<InvertIf<Invert, Equals<T, U>>, PASS, FAIL<FailMessage['notEqual']>>;

  /** expected type should be extended of asserting type*/
  isSupertypeOf: <const U>(value?: U) => If<InvertIf<Invert, IsSuperType<T, U>>, PASS, FAIL>;

  /** asserting type should be extended of expected type */
  isSubtypeOf: <const U>(value?: U) => If<InvertIf<Invert, IsSubType<T, U>>, PASS, FAIL>;

  /** Type should be "never" */
  toBeNever: () => If<InvertIf<Invert, IsNever<T>>, PASS, FAIL<FailMessage['isNotNever']>>;

  /** Type should be "undefined" */
  toBeUndefined: () => If<InvertIf<Invert, IsUndefined<T>>, PASS, FAIL<FailMessage['isNotUndefined']>>;

  /** Type should be "null" */
  toBeNull: () => If<InvertIf<Invert, IsNull<T>>, PASS, FAIL<FailMessage['isNotUndefined']>>;

  /** Type should extends of Object, Array or Function */
  toBeObject: () => If<InvertIf<Invert, IsObject<T>>, PASS, FAIL<FailMessage['isNotObject']>>;

  /** Type should extends only of Objects */
  toBeStrictObject: () => If<InvertIf<Invert, IsStrictObject<T>>, PASS, FAIL<FailMessage['isNotObject']>>;

  length: T extends unknown[]
  ? Equals<T['length'], number> extends true ? 'infinity' : T['length']
  : FAIL<"'expect' type do not have property of type length">
}

export type IValidationsFn<T extends AnyFunction> = IValidations<T> & { returned: IValidations<ReturnType<T>> }
export type AssertType = <T>() => T extends AnyFunction ? IValidationsFn<T> : IValidations<T> 

export type AssertsCollection = { [testName: string]: PASS } | PASS[];

export type TestsCallback = (validator: (asserts: AssertsCollection) => never) => void | AssertsCollection;
