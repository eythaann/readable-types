import { IsObject, IsStrictObject } from ".";
import { AnyFunction, AnyObject } from "../../constants";


testType('IsObject', () => {
  testType('Should return false if type is not of type object, array or func', () => {
    assertType<IsObject<number>>().equals<false>(PASS)
    assertType<IsObject<string>>().equals<false>(PASS)
    assertType<IsObject<'1234'>>().equals<false>(PASS)
    assertType<IsObject<1234>>().equals<false>(PASS)
    assertType<IsObject<any>>().equals<false>(PASS)
    assertType<IsObject<unknown>>().equals<false>(PASS)
    assertType<IsObject<undefined>>().equals<false>(PASS)
    assertType<IsObject<null>>().equals<false>(PASS)
    assertType<IsObject<never>>().equals<false>(PASS)
    assertType<IsObject<bigint>>().equals<false>(PASS)
    assertType<IsObject<symbol>>().equals<false>(PASS)
  })

  testType('Should return true if type is of type object, array or func', () => {
    assertType<IsObject<AnyObject>>().equals<true>(PASS)
    assertType<IsObject<any[]>>().equals<true>(PASS)
    assertType<IsObject<never[]>>().equals<true>(PASS)
    assertType<IsObject<AnyFunction>>().equals<true>(PASS)
    assertType<IsObject<AnyObject>>().equals<false>(FAIL)
    assertType<IsObject<any[]>>().equals<false>(FAIL)
    assertType<IsObject<never[]>>().equals<false>(FAIL)
    assertType<IsObject<AnyFunction>>().equals<false>(FAIL)
  })
});


testType('IsStrictObject', () => {
  testType('Should return false if type is not of type object', () => {
    assertType<IsStrictObject<number>>().equals<false>(PASS)
    assertType<IsStrictObject<string>>().equals<false>(PASS)
    assertType<IsStrictObject<'1234'>>().equals<false>(PASS)
    assertType<IsStrictObject<1234>>().equals<false>(PASS)
    assertType<IsStrictObject<any>>().equals<false>(PASS)
    assertType<IsStrictObject<unknown>>().equals<false>(PASS)
    assertType<IsStrictObject<undefined>>().equals<false>(PASS)
    assertType<IsStrictObject<null>>().equals<false>(PASS)
    assertType<IsStrictObject<never>>().equals<false>(PASS)
    assertType<IsStrictObject<bigint>>().equals<false>(PASS)
    assertType<IsStrictObject<symbol>>().equals<false>(PASS)
    assertType<IsStrictObject<any[]>>().equals<false>(PASS)
    assertType<IsStrictObject<never[]>>().equals<false>(PASS)
    assertType<IsStrictObject<AnyFunction>>().equals<false>(PASS)
  })

  testType('Should return true if type is of type object', () => {
    assertType<IsStrictObject<AnyObject>>().equals<true>(PASS)
    assertType<IsStrictObject<AnyObject>>().equals<false>(FAIL)
  })
});