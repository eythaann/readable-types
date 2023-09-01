import { IsString, Split, SplitReverce, Stringtify, TupleToString, startsWith } from '.';

describeType('IsString', () => {
  testType('Should return true only for string', [
    assertType<IsString<string>>().equals<true>(),
    assertType<IsString<string | never>>().equals<true>(),
  ]);

  testType('Should return false for all other types', [
    assertType<IsString<any>>().equals<false>(),
    assertType<IsString<never>>().equals<false>(),
    assertType<IsString<number>>().equals<false>(),
    assertType<IsString<{}>>().equals<false>(),
    assertType<IsString<null>>().equals<false>(),
    assertType<IsString<undefined>>().equals<false>(),
    assertType<IsString<unknown>>().equals<false>(),
    assertType<IsString<any[]>>().equals<false>(),
    assertType<IsString<symbol>>().equals<false>(),
    assertType<IsString<bigint>>().equals<false>(),
    assertType<IsString<string | number>>().equals<false>(),
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