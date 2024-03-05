import { And, isBoolean, isFalse, isTrue, Or, Xor } from './infrastructure';

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
});

describeType('Or', () => {
  testType('Should return true if at least one value in the tuple is true', [
    assertType<Or<[true, false, false]>>().toBeTrue(),
    assertType<Or<[false, false, false]>>().toBeFalse(),
  ]);
});

describeType('Not', () => {
  testType('Should return the negation of the given boolean value', [
    assertType<not<true>>().toBeFalse(),
    assertType<not<false>>().toBeTrue(),
  ]);
});

describeType('Xor', () => {
  testType('Should conditionally return the Xor operation', [
    assertType<Xor<true, true>>().toBeFalse(),
    assertType<Xor<true, false>>().toBeTrue(),
    assertType<Xor<false, true>>().toBeTrue(),
    assertType<Xor<false, false>>().toBeFalse(),
  ]);
});

describeType('IsTrue', () => {
  testType('Should determine if a type is `true`', () => {
    let _1: isTrue<false> = false;
    let _2: isTrue<true> = true;
    let _3: isTrue<any> = false;
    let _4: isTrue<unknown> = false;
    let _5: isTrue<never> = false;
    let _6: isTrue<{}> = false;
    let _7: isTrue<undefined> = false;
    let _8: isTrue<0> = false;
    let _9: isTrue<1> = false;
    let _10: isTrue<string> = false;
    let _11: isTrue<boolean> = false;
    let _12: isTrue<'true'> = false;
    let _13: isTrue<'false'> = false;

    // @ts-expect-error
    let _1b: isTrue<false> = true;
    // @ts-expect-error
    let _2b: isTrue<true> = false;
    // @ts-expect-error
    let _3b: isTrue<any> = true;
    // @ts-expect-error
    let _4b: isTrue<unknown> = true;
    // @ts-expect-error
    let _5b: isTrue<never> = true;
    // @ts-expect-error
    let _6b: isTrue<{}> = true;
    // @ts-expect-error
    let _7b: isTrue<undefined> = true;
    // @ts-expect-error
    let _8b: isTrue<0> = true;
    // @ts-expect-error
    let _9b: isTrue<1> = true;
    // @ts-expect-error
    let _10b: isTrue<string> = true;
    // @ts-expect-error
    let _11b: isTrue<boolean> = true;
    // @ts-expect-error
    let _12b: isTrue<'true'> = true;
    // @ts-expect-error
    let _13b: isTrue<'false'> = true;
  });
});

describeType('IsFalse', () => {
  testType('Should determine if a type is `false`', () => {
    let _1: isFalse<false> = true;
    let _2: isFalse<true> = false;
    let _3: isFalse<any> = false;
    let _4: isFalse<unknown> = false;
    let _5: isFalse<never> = false;
    let _6: isFalse<{}> = false;
    let _7: isFalse<undefined> = false;
    let _8: isFalse<0> = false;
    let _9: isFalse<1> = false;
    let _10: isFalse<string> = false;
    let _11: isFalse<boolean> = false;
    let _12: isFalse<'true'> = false;
    let _13: isFalse<'false'> = false;

    // @ts-expect-error
    let _1b: isFalse<false> = false;
    // @ts-expect-error
    let _2b: isFalse<true> = true;
    // @ts-expect-error
    let _3b: isFalse<any> = true;
    // @ts-expect-error
    let _4b: isFalse<unknown> = true;
    // @ts-expect-error
    let _5b: isFalse<never> = true;
    // @ts-expect-error
    let _6b: isFalse<{}> = true;
    // @ts-expect-error
    let _7b: isFalse<undefined> = true;
    // @ts-expect-error
    let _8b: isFalse<0> = true;
    // @ts-expect-error
    let _9b: isFalse<1> = true;
    // @ts-expect-error
    let _10b: isFalse<string> = true;
    // @ts-expect-error
    let _11b: isFalse<boolean> = true;
    // @ts-expect-error
    let _12b: isFalse<'true'> = true;
    // @ts-expect-error
    let _13b: isFalse<'false'> = true;
  });
});