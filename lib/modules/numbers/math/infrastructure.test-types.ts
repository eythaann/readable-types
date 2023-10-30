import { add, substract } from './infrastructure';

describeType('Add', () => {
  testType('Should add two numbers and produce a string result', [
    assertType<add<5, 10>>().equals<15>(),
    assertType<add<0, 0>>().equals<0>(),
    assertType<add<100, 109>>().equals<209>(),
    assertType<add<123, 456>>().equals<579>(),
    assertType<add<50, 50>>().equals<100>(),
    assertType<add<99, 1>>().equals<100>(),
    assertType<add<1, 99>>().equals<100>(),
  ]);
});

describeType('Substract', () => {
  testType('Should Substract two numbers and produce a string result', [
    assertType<substract<5, 10>>().equals<-5>(),
    assertType<substract<0, 0>>().equals<0>(),
    assertType<substract<100, 109>>().equals<-9>(),
    assertType<substract<456, 123>>().equals<333>(),
    assertType<substract<123, 456>>().equals<-333>(),
    assertType<substract<50, 50>>().equals<-0>(),
    assertType<substract<99, 1>>().equals<98>(),
    assertType<substract<1, 99>>().equals<-98>(),
  ]);
});