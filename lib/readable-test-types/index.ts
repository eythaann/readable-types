import { If } from '../utils/conditions';
import { IsNever } from '../utils/never';
import { FailMsgs } from './messages';
import { Equals, IsSubType, IsSuperType } from '../utils/comparison';
import { IsNull, IsUndefined } from '../utils/undefined';
import { IsObject, IsStrictObject } from '../utils/objects';
import { NotIf as InvertIf } from '../utils/booleans';
import { AnyFunction } from '../constants';

type InferredType = string | number | boolean | object | undefined | null;
type Awaited<Type> = Type extends Promise<infer K> ? Awaited<K> : Type;
export interface IValidations<T, I extends boolean = false> {
  not: IValidations<T, true>;

  awaited: IValidations<Awaited<T>, I>;

  /** asserting type should be the same type as the expected */
  equals: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, Equals<T, U>>, PASS, FAIL<FailMsgs['notEqual']>>;

  /** expected type should be extended of asserting type*/
  isSupertypeOf: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, IsSuperType<T, U>>, PASS, FAIL>;

  /** asserting type should be extended of expected type */
  isSubtypeOf: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, IsSubType<T, U>>, PASS, FAIL>;

  /** Type should be "never" */
  toBeNever: () => If<InvertIf<I, IsNever<T>>, PASS, FAIL<FailMsgs['isNotNever']>>;

  /** Type should be "null" */
  toBeNull: () => If<InvertIf<I, IsNull<T>>, PASS, FAIL<FailMsgs['isNotUndefined']>>;

  /** Type should be "undefined" */
  toBeUndefined: () => If<InvertIf<I, IsUndefined<T>>, PASS, FAIL<FailMsgs['isNotUndefined']>>;

  /** Type should be "never" */
  toBeAny: () => never;

  /** Type should extends of Object, Array or Function */
  toBeObject: () => If<InvertIf<I, IsObject<T>>, PASS, FAIL<FailMsgs['isNotObject']>>;

  /** Type should extends only of Objects */
  toBeStrictObject: () => If<InvertIf<I, IsStrictObject<T>>, PASS, FAIL<FailMsgs['isNotObject']>>;

  toBeFunction: () => never;

  toBeArray: () => never;

  toBeTuple: () => never;

  toBeTupleContaining: () => never;

  BeTupleWithLength: <U>(v?: U) => never;

  toBeString: () => never;

  toBeNumber: () => never;

  toBeBoolean: () => never;

  toBePromise: () => never;

  toHaveProperty: () => never;
}

export type IValidationsFn<T extends AnyFunction> = IValidations<T> & { returned: IValidations<ReturnType<T>> };
export type AssertType = <T>() => [T] extends [AnyFunction] ? IValidationsFn<T> : IValidations<T>;

export type AssertsCollection = { [testName: string]: PASS } | PASS[];

export type TestsCallback = (validator: (asserts: AssertsCollection) => never) => void | AssertsCollection;
