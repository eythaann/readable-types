import { Add } from './math';

describeType('Add', () => {
  testType('Should add two numbers and produce a string result', [
    assertType<Add<5, 10>>().equals<'15'>(),
    assertType<Add<0, 0>>().equals<'0'>(),
    assertType<Add<100, 109>>().equals<'209'>(),
    assertType<Add<123, 456>>().equals<'579'>(),
    assertType<Add<50, 50>>().equals<'100'>(),
    assertType<Add<99, 1>>().equals<'100'>(),
    assertType<Add<1, 99>>().equals<'100'>(),
    assertType<Add<'1', '99'>>().equals<'100'>(),
    assertType<Add<'1ff', '99'>>().equals<'199'>(),
  ]);
});