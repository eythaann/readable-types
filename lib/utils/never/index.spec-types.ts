import { IsNever } from ".";
import { AnyFunction, AnyObject } from "../../constants";

testType('IsNever', () => {
  testType('Should return false if type is not of type never', () => {
    assertType<IsNever<number>>().equals<false>(PASS)
    assertType<IsNever<string>>().equals<false>(PASS)
    assertType<IsNever<'1234'>>().equals<false>(PASS)
    assertType<IsNever<1234>>().equals<false>(PASS)
    assertType<IsNever<any>>().equals<false>(PASS)
    assertType<IsNever<unknown>>().equals<false>(PASS)
    assertType<IsNever<undefined>>().equals<false>(PASS)
    assertType<IsNever<null>>().equals<false>(PASS)
    assertType<IsNever<AnyObject>>().equals<false>(PASS)
    assertType<IsNever<AnyFunction>>().equals<false>(PASS)
    assertType<IsNever<bigint>>().equals<false>(PASS)
    assertType<IsNever<any[]>>().equals<false>(PASS)
    assertType<IsNever<never[]>>().equals<false>(PASS)
    assertType<IsNever<symbol>>().equals<false>(PASS)
  })

  testType('Should return true if type is of type never', () => {
    assertType<IsNever<never>>().equals<true>(PASS)
    assertType<IsNever<never>>().equals<false>(FAIL)
  })
})