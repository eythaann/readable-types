import { IsString, Split, SplitReverce, Stringtify, TupleToString, startsWith } from './infrastructure';

describeType('IsString', () => {
  testType('Should return true only for string', [
    assertType<IsString<string>>().toBeTrue(),
    assertType<IsString<string | never>>().toBeTrue(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsString<any>>().toBeFalse(),
    assertType<IsString<never>>().toBeFalse(),
    assertType<IsString<number>>().toBeFalse(),
    assertType<IsString<{}>>().toBeFalse(),
    assertType<IsString<null>>().toBeFalse(),
    assertType<IsString<undefined>>().toBeFalse(),
    assertType<IsString<unknown>>().toBeFalse(),
    assertType<IsString<any[]>>().toBeFalse(),
    assertType<IsString<symbol>>().toBeFalse(),
    assertType<IsString<bigint>>().toBeFalse(),
    assertType<IsString<string | number>>().toBeFalse(),
  ]);
});

describeType('Stringtify', () => {
  testType('Should return a stringified version of the input', [
    assertType<Stringtify<42>>().equals<'42'>(),
    assertType<Stringtify<true>>().equals<'true'>(),
    assertType<Stringtify<null>>().equals<'null'>(),
    assertType<Stringtify<undefined>>().equals<'undefined'>(),
    assertType<Stringtify<{ a: 1; b: 2 }>>().equals<'[object Object]'>(),
  ]);
});

describeType('TupleToString', () => {
  testType('Should return a stringified version of the tuple elements', [
    assertType<TupleToString<[42, true, null, undefined, { a: 1; b: 2 }]>>().equals<'42truenullundefined[object Object]'>(),
    assertType<TupleToString<[1, 2, 3, 4, 5]>>().equals<'12345'>(),
    assertType<TupleToString<[true, false, true, false]>>().equals<'truefalsetruefalse'>(),
    assertType<TupleToString<[]>>().equals<''>(),
  ]);
});

describeType('Split', () => {
  testType('Should split a string into a tuple of characters', [
    assertType<Split<'Hello'>>().equals<['H', 'e', 'l', 'l', 'o']>(),
    assertType<Split<'TypeScript'>>().equals<['T', 'y', 'p', 'e', 'S', 'c', 'r', 'i', 'p', 't']>(),
    assertType<Split<'12345'>>().equals<['1', '2', '3', '4', '5']>(),
    assertType<Split<''>>().equals<[]>(),
  ]);
});

describeType('SplitReverce', () => {
  testType('Should split a string into a tuple of characters in reverse order', [
    assertType<SplitReverce<'Hello'>>().equals<['o', 'l', 'l', 'e', 'H']>(),
    assertType<SplitReverce<'TypeScript'>>().equals<['t', 'p', 'i', 'r', 'c', 'S', 'e', 'p', 'y', 'T']>(),
    assertType<SplitReverce<'12345'>>().equals<['5', '4', '3', '2', '1']>(),
    assertType<SplitReverce<''>>().equals<[]>(),
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