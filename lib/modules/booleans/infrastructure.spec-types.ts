import { All, And, Every, IsBoolean, Or, Some, Not, NotIf, IsTrue, IsFalse } from './infrastructure';

describeType('IsBoolean', () => {
  testType('Should return true only for boolean', [
    assertType<IsBoolean<boolean>>().toBeTrue(),
    assertType<IsBoolean<boolean | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsBoolean<any>>().toBeFalse(),
    assertType<IsBoolean<never>>().toBeFalse(),
    assertType<IsBoolean<number>>().toBeFalse(),
    assertType<IsBoolean<{}>>().toBeFalse(),
    assertType<IsBoolean<null>>().toBeFalse(),
    assertType<IsBoolean<undefined>>().toBeFalse(),
    assertType<IsBoolean<unknown>>().toBeFalse(),
    assertType<IsBoolean<any[]>>().toBeFalse(),
    assertType<IsBoolean<symbol>>().toBeFalse(),
    assertType<IsBoolean<bigint>>().toBeFalse(),
    assertType<IsBoolean<string | number>>().toBeFalse(),
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
    assertType<IsTrue<true>>().__internal.shouldBe(true),
    assertType<IsTrue<false>>().__internal.shouldBe(false),
    assertType<IsTrue<any>>().__internal.shouldBe(false),
    assertType<IsTrue<unknown>>().__internal.shouldBe(false),
    assertType<IsTrue<never>>().__internal.shouldBe(false),
    assertType<IsTrue<{}>>().__internal.shouldBe(false),
    assertType<IsTrue<null>>().__internal.shouldBe(false),
    assertType<IsTrue<undefined>>().__internal.shouldBe(false),
    assertType<IsTrue<0>>().__internal.shouldBe(false),
    assertType<IsTrue<1>>().__internal.shouldBe(false),
    assertType<IsTrue<string>>().__internal.shouldBe(false),
    assertType<IsTrue<boolean>>().__internal.shouldBe(false),
    assertType<IsTrue<'true'>>().__internal.shouldBe(false),
    assertType<IsTrue<'false'>>().__internal.shouldBe(false),
  ]);
});

describeType('IsFalse', () => {
  testType('Should determine if a type is `false`', [
    assertType<IsFalse<false>>().__internal.shouldBe(true),
    assertType<IsFalse<true>>().__internal.shouldBe(false),
    assertType<IsFalse<any>>().__internal.shouldBe(false),
    assertType<IsFalse<unknown>>().__internal.shouldBe(false),
    assertType<IsFalse<never>>().__internal.shouldBe(false),
    assertType<IsFalse<{}>>().__internal.shouldBe(false),
    assertType<IsFalse<null>>().__internal.shouldBe(false),
    assertType<IsFalse<undefined>>().__internal.shouldBe(false),
    assertType<IsFalse<0>>().__internal.shouldBe(false),
    assertType<IsFalse<1>>().__internal.shouldBe(false),
    assertType<IsFalse<string>>().__internal.shouldBe(false),
    assertType<IsFalse<boolean>>().__internal.shouldBe(false),
    assertType<IsFalse<'true'>>().__internal.shouldBe(false),
    assertType<IsFalse<'false'>>().__internal.shouldBe(false),
  ]);
});