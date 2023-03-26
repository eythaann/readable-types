import {
  If,
  IsFunction,
  IsArray,
  NotIf as InvertIf,
  IsObject,
  IsStrictObject,
  IsNull,
  IsUndefined,
  Equals,
  IsSubType,
  IsSuperType,
  IsNever,
  IsString,
  IsNumber,
  IsBoolean,
  IsAny,
  IsPromise,
  Not,
  IsUnknown,
} from '../utils';
import { FailMsgs } from './messages';
import { AnyFunction } from '../constants';

type InferredType = string | number | boolean | object | undefined | null;
type Awaited<Type> = Type extends Promise<infer K> ? Awaited<K> : Type;

export interface IValidations<T, I extends boolean = false> {
  not: IValidations<T, true>;

  awaited: IValidations<Awaited<T>, I>;

  /** asserting type should be the same type as the expected */
  equals: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, Equals<T, U>>, PASS, FAIL<FailMsgs<I>['equal']>>;

  /** expected type should be extended of asserting type*/
  isSupertypeOf: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, IsSuperType<T, U>>, PASS, FAIL>;

  /** asserting type should be extended of expected type */
  isSubtypeOf: <U extends Readonly<InferredType>>(v?: U) => If<InvertIf<I, IsSubType<T, U>>, PASS, FAIL>;

  /** Type should be "never" */
  toBeNever: () => If<InvertIf<I, IsNever<T>>, PASS, FAIL<FailMsgs<I>['never']>>;

  /** Type should be "null" */
  toBeNull: () => If<InvertIf<I, IsNull<T>>, PASS, FAIL<FailMsgs<I>['null']>>;

  /** Type should be "undefined" */
  toBeUndefined: () => If<InvertIf<I, IsUndefined<T>>, PASS, FAIL<FailMsgs<I>['undefined']>>;

  /** Type should be "any" */
  toBeAny: () => If<InvertIf<I, IsAny<T>>, PASS, FAIL<FailMsgs<I>['any']>>;

  /** Type should extends of Object, Array or Function */
  toBeObject: () => If<InvertIf<I, IsObject<T>>, PASS, FAIL<FailMsgs<I>['object']>>;

  /** Type should extends only of Objects */
  toBeStrictObject: () => If<InvertIf<I, IsStrictObject<T>>, PASS, FAIL<FailMsgs<I>['object']>>;

  /** Type should extends of function */
  toBeFunction: () => If<InvertIf<I, IsFunction<T>>, PASS, FAIL<FailMsgs<I>['function']>>;

  /** Type should be a array */
  toBeArray: () => If<InvertIf<I, IsArray<T>>, PASS, FAIL<FailMsgs<I>['array']>>;

  toBeTuple: () => never;

  toBeTupleContaining: () => never;

  BeTupleWithLength: <U>(v?: U) => never;

  /** Type should be a string */
  toBeString: () => If<InvertIf<I, IsString<T>>, PASS, FAIL<FailMsgs<I>['string']>>;

  /** Type should be a number */
  toBeNumber: () => If<InvertIf<I, IsNumber<T>>, PASS, FAIL<FailMsgs<I>['number']>>;

  /** Type should be true | false */
  toBeBoolean: () => If<InvertIf<I, IsBoolean<T>>, PASS, FAIL<FailMsgs<I>['boolean']>>;

  /** Type should be a promise */
  toBePromise: () => If<InvertIf<I, IsPromise<T>>, PASS, FAIL<FailMsgs<I>['promise']>>;

  /** Type should has the property passed */
  // @ts-ignore
  toHaveProperty: <U extends Readonly<string>>(v?: U) => If<InvertIf<I, Not<IsUnknown<T[U]>>>, PASS, FAIL<FailMsgs<I>['property']>>;
}

export type IValidationsFn<T extends AnyFunction> = IValidations<T> & { returned: IValidations<ReturnType<T>> };
export type AssertType = <T>() => [T] extends [AnyFunction] ? IValidationsFn<T> : IValidations<T>;

export type AssertsCollection = { [testName: string]: PASS } | PASS[];

export type TestsCallback = (validator: (asserts: AssertsCollection) => never) => void | AssertsCollection;
