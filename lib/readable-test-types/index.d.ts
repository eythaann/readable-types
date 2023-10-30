import { ForceExtract } from '../modules/app';
import {
  isFunction,
  isArray,
  NotIf as InvertIf,
  isObject,
  isStrictObject,
  isNull,
  isUndefined,
  equals,
  isSubtype,
  isSupertype,
  isNever,
  isString,
  isNumber,
  isBoolean,
  isAny,
  isPromise,
  Not,
  isUnknown,
  isTuple,
  And,
  isTrue,
  isFalse,
  Opaque,
  hasProperty,
} from '../modules/infrastructure';
import { FailMsgs } from './messages';

type FAIL<_T extends string = 'No Message'> = {
  status: Opaque<string, 'FAIL'>;
  msg: _T;
};

type InferrableTypes = string | number | boolean | object | undefined | null;
type Awaited<Type> = Type extends Promise<infer K> ? Awaited<K> : Type;
type Returned<Type> = Type extends (() => infer K) ? K : never;

type propertyCallableOnPass<
  Result extends boolean,
  Invert extends boolean,
  keyToErrorsMsg extends keyof FailMsgs
> = If<InvertIf<Invert, Result>, {
  then: () => void;
  else: FAIL<FailMsgs<Invert>[keyToErrorsMsg]>;
}>;

interface IValidationsPublic<T, I extends boolean = false> {
  not: IValidationsPublic<T, Not<I>>;

  awaited: IValidationsPublic<Awaited<T>, I>;

  returned: IValidationsPublic<Returned<T>, I>;

  /**
   * asserting type should be the same type as the expected
   *
   * !WARNING: avoid use `equals` to compare with `any` or `never` instead use `toBeAny` and `toBeNever`.
   *
   * Other alternative: assertType<Equals<A, B>>().toBe[True|False]();
  */
  equals: <U extends InvertIf<I, equals<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['equal']>>(v?: U) => void;

  /** expected type should be extended of asserting type*/
  isSuperTypeOf: <U extends InvertIf<I, isSupertype<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['supertype']>>(v?: U) => void;

  /** asserting type should be extended of expected type */
  isSubTypeOf: <U extends InvertIf<I, isSubtype<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['subtype']>>(v?: U) => void;

  /** Type should be `true` */
  toBeTrue: propertyCallableOnPass<isTrue<T>, I, 'truly'>;

  /** Type should be `false` */
  toBeFalse: propertyCallableOnPass<isFalse<T>, I, 'falsy'>;

  /** Type should be "never" */
  toBeNever: propertyCallableOnPass<isNever<T>, I, 'never'>;

  /** Type should be "null" */
  toBeNull: propertyCallableOnPass<isNull<T>, I, 'null'>;

  /** Type should be "undefined" */
  toBeUndefined: propertyCallableOnPass<isUndefined<T>, I, 'undefined'>;

  /** Type should be "any" */
  toBeAny: propertyCallableOnPass<isAny<T>, I, 'any'>;

  /** Type should be "unknow" */
  toBeUnknow: propertyCallableOnPass<isUnknown<T>, I, 'unknow'>;

  /** Type should extends of Object, Array or Function */
  toBeObject: propertyCallableOnPass<isObject<T>, I, 'object'>;

  /** Type should extends only of Objects */
  toBeStrictObject: propertyCallableOnPass<isStrictObject<T>, I, 'object'>;

  /** Type should extends of function */
  toBeFunction: propertyCallableOnPass<isFunction<T>, I, 'function'>;

  /** Type should be a array */
  toBeArray: propertyCallableOnPass<isArray<T>, I, 'array'>;

  /** Type should be a tuple */
  toBeTuple: propertyCallableOnPass<isTuple<T>, I, 'tuple'>;

  /** Type should be a tuple of passed length */
  toBeTupleWithLength: <U extends InvertIf<I, And<[isTuple<T>, equals<U, ForceExtract<T, 'lenght'>>]>> extends true ? Readonly<number> : FAIL<FailMsgs<I>['tuple']>>(v?: U) => void;

  /** Type should be a string */
  toBeString: propertyCallableOnPass<isString<T>, I, 'string'>;

  /** Type should be a number */
  toBeNumber: propertyCallableOnPass<isNumber<T>, I, 'number'>;

  /** Type should be true | false */
  toBeBoolean: propertyCallableOnPass<isBoolean<T>, I, 'boolean'>;

  /** Type should be a promise */
  toBePromise: propertyCallableOnPass<isPromise<T>, I, 'promise'>;

  /** Type should has the property passed */
  toHaveProperty: <U extends InvertIf<I, hasProperty<T, U>> extends true ? Readonly<string> : FAIL<FailMsgs<I>['property']>>(v?: U) => void;
}

type IValidationsInternal<T> = IValidationsPublic<T> & {
  __internal: {
    shouldBe: (a: T) => void;
  };
};

export type IValidations<T> = isTrue<ForceExtract<RT_CONFIG, 'development'>> extends true
  ? IValidationsInternal<T>
  : IValidationsPublic<T>;

export type TestsCallback = (validator: (asserts: anyObject) => void) => anyObject | void;
