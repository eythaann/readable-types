import {
  equals,
  hasProperty,
  isAny,
  isArray,
  isBoolean,
  isFalse,
  isFunction,
  isNever,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isStrictObject,
  isString,
  isSubtype,
  isSupertype,
  isTrue,
  isTuple,
  isUndefined,
  isUnknown,
  Opaque,
  Xor,
} from '../modules';
import { FailMsgs } from './messages';

import { forceExtract } from '../modules/app';

type RTT_PASS = {
  status: Opaque<string, 'PASS'>;
};

type RTT_FAIL<_T extends string = 'No Message'> = {
  status: Opaque<string, 'FAIL'>;
  msg: _T;
};

type Awaited<Type> = Type extends Promise<infer K> ? Awaited<K> : Type;
type Returned<Type> = Type extends (() => infer K) ? K : never;

type Assertion<
  Result extends boolean,
  Invert extends boolean,
  keyToErrorsMsg extends keyof FailMsgs,
> = () => $if<Xor<Invert, Result>, {
  then: RTT_PASS;
  else: RTT_FAIL<FailMsgs<Invert>[keyToErrorsMsg]>;
}>;

interface Assertions<T, I extends boolean = false> {
  not: Assertions<T, not<I>>;

  awaited: Assertions<Awaited<T>, I>;

  returned: Assertions<Returned<T>, I>;

  /** asserting type should be the same type as the expected*/
  equals: <U>() => Xor<I, equals<T, U>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['equal']>;

  /** expected type should be extended of asserting type*/
  isSuperTypeOf: <U>() => Xor<I, isSupertype<T, U>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['supertype']>;

  /** expected type should be extended of asserting type*/
  isAssignableTo: <U>() => Xor<I, isSubtype<T, U>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['subtype']>;

  /** asserting type should be extended of expected type */
  isSubTypeOf: <U>() => Xor<I, isSubtype<T, U>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['subtype']>;

  /** Type should be `true` */
  toBeTrue: Assertion<isTrue<T>, I, 'truly'>;

  /** Type should be `false` */
  toBeFalse: Assertion<isFalse<T>, I, 'falsy'>;

  /** Type should be "never" */
  toBeNever: Assertion<isNever<T>, I, 'never'>;

  /** Type should be "null" */
  toBeNull: Assertion<isNull<T>, I, 'null'>;

  /** Type should be "undefined" */
  toBeUndefined: Assertion<isUndefined<T>, I, 'undefined'>;

  /** Type should be "any" */
  toBeAny: Assertion<isAny<T>, I, 'any'>;

  /** Type should be "unknow" */
  toBeUnknow: Assertion<isUnknown<T>, I, 'unknow'>;

  /** Type should extends of Object, Array or Function */
  toBeObject: Assertion<isObject<T>, I, 'object'>;

  /** Type should extends only of Objects */
  toBeStrictObject: Assertion<isStrictObject<T>, I, 'object'>;

  /** Type should extends of function */
  toBeFunction: Assertion<isFunction<T>, I, 'function'>;

  /** Type should be a array */
  toBeArray: Assertion<isArray<T>, I, 'array'>;

  /** Type should be a tuple */
  toBeTuple: Assertion<isTuple<T>, I, 'tuple'>;

  /** Type should be a tuple of passed length */
  toBeTupleWithLength: <U>() => Xor<I, isTuple<T> & equals<U, forceExtract<T, 'lenght'>>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['tuple']>;

  /** Type should be a string */
  toBeString: Assertion<isString<T>, I, 'string'>;

  /** Type should be a number */
  toBeNumber: Assertion<isNumber<T>, I, 'number'>;

  /** Type should be true | false */
  toBeBoolean: Assertion<isBoolean<T>, I, 'boolean'>;

  /** Type should be a promise */
  toBePromise: Assertion<isPromise<T>, I, 'promise'>;

  /** Type should has the property passed */
  toHaveProperty: <U extends Readonly<PropertyKey>>(v?: U) => Xor<I, hasProperty<T, U>> extends true ? RTT_PASS : RTT_FAIL<FailMsgs<I>['property']>;
}

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: (() => void) | any[] | unknownObject): void;
  function assertType<T>(): Assertions<T>;
}