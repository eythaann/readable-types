import { ForceExtract } from '../modules/app';
import {
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
  IsTuple,
  And,
  IsTrue,
  IsFalse,
  AnyObject,
  Opaque,
  HasProperty,
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
  equals: <U extends InvertIf<I, Equals<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['equal']>>(v?: U) => void;

  /** expected type should be extended of asserting type*/
  isSuperTypeOf: <U extends InvertIf<I, IsSuperType<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['supertype']>>(v?: U) => void;

  /** asserting type should be extended of expected type */
  isSubTypeOf: <U extends InvertIf<I, IsSubType<T, U>> extends true ? Readonly<InferrableTypes> : FAIL<FailMsgs<I>['subtype']>>(v?: U) => void;

  /** Type should be `true` */
  toBeTrue: propertyCallableOnPass<IsTrue<T>, I, 'truly'>;

  /** Type should be `false` */
  toBeFalse: propertyCallableOnPass<IsFalse<T>, I, 'falsy'>;

  /** Type should be "never" */
  toBeNever: propertyCallableOnPass<IsNever<T>, I, 'never'>;

  /** Type should be "null" */
  toBeNull: propertyCallableOnPass<IsNull<T>, I, 'null'>;

  /** Type should be "undefined" */
  toBeUndefined: propertyCallableOnPass<IsUndefined<T>, I, 'undefined'>;

  /** Type should be "any" */
  toBeAny: propertyCallableOnPass<IsAny<T>, I, 'any'>;

  /** Type should be "unknow" */
  toBeUnknow: propertyCallableOnPass<IsUnknown<T>, I, 'unknow'>;

  /** Type should extends of Object, Array or Function */
  toBeObject: propertyCallableOnPass<IsObject<T>, I, 'object'>;

  /** Type should extends only of Objects */
  toBeStrictObject: propertyCallableOnPass<IsStrictObject<T>, I, 'object'>;

  /** Type should extends of function */
  toBeFunction: propertyCallableOnPass<IsFunction<T>, I, 'function'>;

  /** Type should be a array */
  toBeArray: propertyCallableOnPass<IsArray<T>, I, 'array'>;

  /** Type should be a tuple */
  toBeTuple: propertyCallableOnPass<IsTuple<T>, I, 'tuple'>;

  /** Type should be a tuple of passed length */
  toBeTupleWithLength: <U extends InvertIf<I, And<[IsTuple<T>, Equals<U, ForceExtract<T, 'lenght'>>]>> extends true ? Readonly<number> : FAIL<FailMsgs<I>['tuple']>>(v?: U) => void;

  /** Type should be a string */
  toBeString: propertyCallableOnPass<IsString<T>, I, 'string'>;

  /** Type should be a number */
  toBeNumber: propertyCallableOnPass<IsNumber<T>, I, 'number'>;

  /** Type should be true | false */
  toBeBoolean: propertyCallableOnPass<IsBoolean<T>, I, 'boolean'>;

  /** Type should be a promise */
  toBePromise: propertyCallableOnPass<IsPromise<T>, I, 'promise'>;

  /** Type should has the property passed */
  toHaveProperty: <U extends InvertIf<I, HasProperty<T, U>> extends true ? Readonly<string> : FAIL<FailMsgs<I>['property']>>(v?: U) => void;
}

type IValidationsInternal<T> = IValidationsPublic<T> & {
  __internal: {
    shouldBe: (a: T) => void;
  };
};

export type IValidations<T> = IsTrue<ForceExtract<RT_CONFIG, 'development'>> extends true
  ? IValidationsInternal<T>
  : IValidationsPublic<T>;

export type TestsCallback = (validator: (asserts: AnyObject) => void) => AnyObject | void;
