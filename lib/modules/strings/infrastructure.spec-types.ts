import { isString, split, splitReverce, stringtify, join, startsWith } from './infrastructure';

describeType('IsString', () => {
  testType('Should return true only for string', [
    assertType<isString<string>>().toBeTrue(),
    assertType<isString<string | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<isString<any>>().toBeFalse(),
    assertType<isString<never>>().toBeFalse(),
    assertType<isString<number>>().toBeFalse(),
    assertType<isString<{}>>().toBeFalse(),
    assertType<isString<null>>().toBeFalse(),
    assertType<isString<undefined>>().toBeFalse(),
    assertType<isString<unknown>>().toBeFalse(),
    assertType<isString<any[]>>().toBeFalse(),
    assertType<isString<symbol>>().toBeFalse(),
    assertType<isString<bigint>>().toBeFalse(),
    assertType<isString<string | number>>().toBeFalse(),
  ]);
});

describeType('Stringtify', () => {
  testType('Should return a stringified version of the input', [
    assertType<stringtify<42>>().equals<'42'>(),
    assertType<stringtify<true>>().equals<'true'>(),
    assertType<stringtify<null>>().equals<'null'>(),
    assertType<stringtify<undefined>>().equals<'undefined'>(),
    assertType<stringtify<{ a: 1; b: 2 }>>().equals<'[object Object]'>(),
  ]);
});

describeType('TupleToString', () => {
  testType('Should return a stringified version of the tuple elements', [
    assertType<join<[42, true, null, undefined, { a: 1; b: 2 }]>>().equals<'42truenullundefined[object Object]'>(),
    assertType<join<[1, 2, 3, 4, 5]>>().equals<'12345'>(),
    assertType<join<[true, false, true, false]>>().equals<'truefalsetruefalse'>(),
    assertType<join<[]>>().equals<''>(),
  ]);
});

describeType('Split', () => {
  testType('Should split a string into a tuple of characters', [
    assertType<split<'Hello'>>().equals<['H', 'e', 'l', 'l', 'o']>(),
    assertType<split<'TypeScript'>>().equals<['T', 'y', 'p', 'e', 'S', 'c', 'r', 'i', 'p', 't']>(),
    assertType<split<'12345'>>().equals<['1', '2', '3', '4', '5']>(),
    assertType<split<''>>().equals<[]>(),
  ]);
});

describeType('SplitReverce', () => {
  testType('Should split a string into a tuple of characters in reverse order', [
    assertType<splitReverce<'Hello'>>().equals<['o', 'l', 'l', 'e', 'H']>(),
    assertType<splitReverce<'TypeScript'>>().equals<['t', 'p', 'i', 'r', 'c', 'S', 'e', 'p', 'y', 'T']>(),
    assertType<splitReverce<'12345'>>().equals<['5', '4', '3', '2', '1']>(),
    assertType<splitReverce<''>>().equals<[]>(),
  ]);
});

describeType('startsWith', () => {
  testType('Should determine if one string starts with another', [
    assertType<startsWith<'hello', 'h'>>().toBeTrue(),
    assertType<startsWith<'hello', 'H'>>().toBeFalse(), // Case sensitive
    assertType<startsWith<'hello', 'he'>>().toBeFalse(), // Only checks the first character
    assertType<startsWith<'', 'h'>>().toBeFalse(), // Edge case: empty string
    assertType<startsWith<'h', ''>>().toBeFalse(), // Edge case: prefix empty string
    assertType<startsWith<'', ''>>().toBeFalse(), // Edge case: both empty strings
  ]);
});