import { All, And, Every, IsBoolean, Or, Some, Not, NotIf, XOR } from '.';

describeType('IsBoolean', () => {
  testType('Should return true only for boolean', [
    assertType<IsBoolean<boolean>>().equals<true>(),
    assertType<IsBoolean<boolean | never>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsBoolean<any>>().equals<false>(),
    assertType<IsBoolean<never>>().equals<false>(),
    assertType<IsBoolean<number>>().equals<false>(),
    assertType<IsBoolean<{}>>().equals<false>(),
    assertType<IsBoolean<null>>().equals<false>(),
    assertType<IsBoolean<undefined>>().equals<false>(),
    assertType<IsBoolean<unknown>>().equals<false>(),
    assertType<IsBoolean<any[]>>().equals<false>(),
    assertType<IsBoolean<symbol>>().equals<false>(),
    assertType<IsBoolean<bigint>>().equals<false>(),
    assertType<IsBoolean<string | number>>().equals<false>(),
  ]);
});

describeType('And', () => {
  testType('Should return true only if all values in the tuple are true', [
    assertType<And<[true, true, true]>>().equals<true>(),
    assertType<And<[true, false, true]>>().equals<false>(),
  ]);

  // Test aliases All and Every
  testType('All and Every should work the same as And', [
    assertType<All<[true, true, true]>>().equals<true>(),
    assertType<Every<[true, false, true]>>().equals<false>(),
  ]);
});

describeType('Or', () => {
  testType('Should return true if at least one value in the tuple is true', [
    assertType<Or<[true, false, false]>>().equals<true>(),
    assertType<Or<[false, false, false]>>().equals<false>(),
  ]);

  // Test alias Some
  testType('Some should work the same as Or', [
    assertType<Some<[true, false, false]>>().equals<true>(),
  ]);
});

describeType('XOR', () => {
  testType('Should return true if exactly one value in the array is true', [
    assertType<XOR<[true, false, false, false]>>().equals<true>(),
    assertType<XOR<[false, true, false, false]>>().equals<true>(),
    assertType<XOR<[false, false, false, true]>>().equals<true>(),
  ]);

  testType('Should return false if more than one value in the array is true', [
    assertType<XOR<[true, true, false, false]>>().equals<false>(),
    assertType<XOR<[true, false, true, false]>>().equals<false>(),
    assertType<XOR<[true, false, false, true]>>().equals<false>(),
    assertType<XOR<[true, true, true, false]>>().equals<false>(),
    assertType<XOR<[true, true, false, true]>>().equals<false>(),
    assertType<XOR<[true, false, true, true]>>().equals<false>(),
    assertType<XOR<[true, true, true, true]>>().equals<false>(),
  ]);

  testType('Should return false if no values in the array are true', [
    assertType<XOR<[false, false, false, false]>>().equals<false>(),
  ]);

  testType('Should return false if array is empty', [
    assertType<XOR<[]>>().equals<false>(),
  ]);
});

describeType('Not', () => {
  testType('Should return the negation of the given boolean value', [
    assertType<Not<true>>().equals<false>(),
    assertType<Not<false>>().equals<true>(),
  ]);
});

describeType('NotIf', () => {
  testType('Should conditionally return the negation of the given boolean value', [
    assertType<NotIf<true, true>>().equals<false>(),
    assertType<NotIf<true, false>>().equals<true>(),
    assertType<NotIf<false, true>>().equals<true>(),
    assertType<NotIf<false, false>>().equals<false>(),
  ]);
});