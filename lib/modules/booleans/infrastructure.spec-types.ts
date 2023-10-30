import { All, And, Every, isBoolean, Or, Some, Not, NotIf, isTrue, isFalse } from './infrastructure';

describeType('IsBoolean', () => {
  testType('Should return true only for boolean', [
    assertType<isBoolean<boolean>>().toBeTrue(),
    assertType<isBoolean<boolean | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<isBoolean<any>>().toBeFalse(),
    assertType<isBoolean<never>>().toBeFalse(),
    assertType<isBoolean<number>>().toBeFalse(),
    assertType<isBoolean<{}>>().toBeFalse(),
    assertType<isBoolean<null>>().toBeFalse(),
    assertType<isBoolean<undefined>>().toBeFalse(),
    assertType<isBoolean<unknown>>().toBeFalse(),
    assertType<isBoolean<any[]>>().toBeFalse(),
    assertType<isBoolean<symbol>>().toBeFalse(),
    assertType<isBoolean<bigint>>().toBeFalse(),
    assertType<isBoolean<string | number>>().toBeFalse(),
  ]);
});

describeType('And', () => {
  testType('Should return true only if all values in the tuple are true', [
    assertType<And<[true, true, true]>>().toBeTrue(),
    assertType<And<[true, false, true]>>().toBeFalse(),
  ]);

  // Test aliases All and Every
  testType('All and Every should work the same as And', [
    assertType<All<[true, true, true]>>().toBeTrue(),
    assertType<Every<[true, false, true]>>().toBeFalse(),
  ]);
});

describeType('Or', () => {
  testType('Should return true if at least one value in the tuple is true', [
    assertType<Or<[true, false, false]>>().toBeTrue(),
    assertType<Or<[false, false, false]>>().toBeFalse(),
  ]);

  // Test alias Some
  testType('Some should work the same as Or', [
    assertType<Some<[true, false, false]>>().toBeTrue(),
  ]);
});

describeType('Not', () => {
  testType('Should return the negation of the given boolean value', [
    assertType<Not<true>>().toBeFalse(),
    assertType<Not<false>>().toBeTrue(),
  ]);
});

describeType('NotIf', () => {
  testType('Should conditionally return the negation of the given boolean value', [
    assertType<NotIf<true, true>>().toBeFalse(),
    assertType<NotIf<true, false>>().toBeTrue(),
    assertType<NotIf<false, true>>().toBeTrue(),
    assertType<NotIf<false, false>>().toBeFalse(),
  ]);
});

describeType('IsTrue', () => {
  testType('Should determine if a type is `true`', [
    assertType<isTrue<true>>().__internal.shouldBe(true),
    assertType<isTrue<false>>().__internal.shouldBe(false),
    assertType<isTrue<any>>().__internal.shouldBe(false),
    assertType<isTrue<unknown>>().__internal.shouldBe(false),
    assertType<isTrue<never>>().__internal.shouldBe(false),
    assertType<isTrue<{}>>().__internal.shouldBe(false),
    assertType<isTrue<null>>().__internal.shouldBe(false),
    assertType<isTrue<undefined>>().__internal.shouldBe(false),
    assertType<isTrue<0>>().__internal.shouldBe(false),
    assertType<isTrue<1>>().__internal.shouldBe(false),
    assertType<isTrue<string>>().__internal.shouldBe(false),
    assertType<isTrue<boolean>>().__internal.shouldBe(false),
    assertType<isTrue<'true'>>().__internal.shouldBe(false),
    assertType<isTrue<'false'>>().__internal.shouldBe(false),
  ]);
});

describeType('IsFalse', () => {
  testType('Should determine if a type is `false`', [
    assertType<isFalse<false>>().__internal.shouldBe(true),
    assertType<isFalse<true>>().__internal.shouldBe(false),
    assertType<isFalse<any>>().__internal.shouldBe(false),
    assertType<isFalse<unknown>>().__internal.shouldBe(false),
    assertType<isFalse<never>>().__internal.shouldBe(false),
    assertType<isFalse<{}>>().__internal.shouldBe(false),
    assertType<isFalse<null>>().__internal.shouldBe(false),
    assertType<isFalse<undefined>>().__internal.shouldBe(false),
    assertType<isFalse<0>>().__internal.shouldBe(false),
    assertType<isFalse<1>>().__internal.shouldBe(false),
    assertType<isFalse<string>>().__internal.shouldBe(false),
    assertType<isFalse<boolean>>().__internal.shouldBe(false),
    assertType<isFalse<'true'>>().__internal.shouldBe(false),
    assertType<isFalse<'false'>>().__internal.shouldBe(false),
  ]);
});