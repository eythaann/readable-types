import { Add, Substract } from './math';

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
    assertType<Add<'1@#', '99'>>().equals<'199'>(),
  ]);
});

describeType('Substract', () => {
  testType('Should Substract two numbers and produce a string result', [
    assertType<Substract<5, 10>>().equals<'-05'>(),
    assertType<Substract<0, 0>>().equals<'-0'>(), // TODO: fix this
    assertType<Substract<100, 109>>().equals<'-009'>(),
    assertType<Substract<456, 123>>().equals<'333'>(),
    assertType<Substract<123, 456>>().equals<'-333'>(),
    assertType<Substract<50, 50>>().equals<'-00'>(),
    assertType<Substract<99, 1>>().equals<'98'>(),
    assertType<Substract<1, 99>>().equals<'-98'>(),
    assertType<Substract<'1', '99'>>().equals<'-98'>(),
    assertType<Substract<'1%#', '99'>>().equals<'001'>(),
  ]);
});