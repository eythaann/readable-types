<div align="center"> <a href="https://github.com/Eythaann/readable-types/">
    <img
      src="https://github.com/Eythaann/readable-types/blob/master/blob/logo.png?raw=true"
      width="650"
      height="auto"
    />
  </a>
</div>
<br/>

<h1>Readable-Types</h1>
With Readable-Types, you can create TypeScript types that are easy to read and understand. The library provides a set of intuitive and expressive utilities for defining complex types, reducing the need for manual type checking and making your code more reliable.

Whether you're building a small project or a large enterprise application, Readable Types can help you save time and reduce errors by providing a more readable and maintainable way to define your types.

In addition to making type creation more manageable, Readable Types also includes a suite of testing utilities to help ensure that your types are correct and reliable. With support for both unit and integration testing, you can rest assured that your types are functioning as expected.

Get started with Readable Types today and take the first step toward a more readable, reliable, and maintainable codebase!

<br/>
<hr>
<br/>

## Installation
To add the library to your project just need to run:
### npm
```bash 
npm install readable-types
```
### yarn
```bash 
yarn add readable-types
```

<br/>
<hr>
<br/>

## Usage
Our library provides a comprehensive set of TypeScript utility functions that are ready to use out of the box. Simply import the library into your project or file, and its all!.

Here's a quick example of how you might use Readable-Types in your project:

```typescript
import { IsString, IsNumber, Modify } from 'readable-types';

type A = { a: string, b: number }

type isNumber = IsNumber<A['b']>;
//   ^? true
type isString = IsString<A['b']>;
//   ^? false

type B = Modify<A, { a: number, c: object }>
//   ^? { a: number, b: number, c: object }
```

<br/>
<hr>
<br/>

## Testing with Readable-Types
In order to verify that your types are functioning as expected, it's essential to implement testing. Readable-Types provides a suite of utilities to aid in this process. You can write your tests in several different ways based on your preferences and requirements.

Here's how to do it:

### 1. Basic Syntax

The simplest way to create tests is by using the `testType` function inside a `describeType` block:

```tsx
describeType('MyType', () => {
  testType('Should behave as expected', [
    assertType<MyType>().equals<ExpectedType>(),
    assertType<MyType>().not.equals<UnexpectedType>(),
    // More assertions...
  ]);
});
```

### 2. Using a Validator Function
You can use a validator function to help organize your tests:
```tsx
describeType('MyType', () => {
  testType('Should behave as expected', (validator) => {
    type MyType = /* Your type here... */;
    type ExpectedType = /* Expected result here... */;
    // More types...

    validator([
      assertType<MyType>().equals<ExpectedType>(),
      // More assertions...
    ]);
  });
});
```
### 3. Returning an Array of Assertions
Instead of passing assertions to the `validator` function, you can also return them directly from the `testType` callback:
note: in returning case is important put `AssertsCollection` as the return type of callback for debuging.

```tsx
describeType('MyType', () => {
  testType('Should behave as expected', (): AssertsCollection => {
    type MyType = /* Your type here... */;
    type ExpectedType = /* Expected result here... */;
    // More types...

    return [
      assertType<MyType>().equals<ExpectedType>(),
      // More assertions...
    ];
  });
});
```

### 4. Returning an Object of Assertions
To give each of your assertions a descriptive label, you can return an object from the `testType` callback:
note: in returning case is important put `AssertsCollection` as the return type of callback for debuging.
```tsx
describeType('MyType', () => {
  testType('Should behave as expected', (): AssertsCollection => {
    type MyType = /* Your type here... */;
    type ExpectedType = /* Expected result here... */;
    // More types...

    return {
      test1: assertType<MyType>().equals<ExpectedType>(),
      test2: assertType<MyType>().equals<ExpectedType>(),
      'MyType should equal ExpectedType': assertType<MyType>().equals<ExpectedType>(),
      'really any text': assertType<MyType>().equals<ExpectedType>(),
      // More labeled assertions...
    };
  });
});
```
This enhances readability and makes it easier to identify which tests have passed and which ones have failed.
### Execute Test
To test with our library, we use the TypeScript compiler (`tsc`) to transpile our code. However, to prevent our test and spec files from being included in the final build add the next in your `tsconfig.json`:
```json
"exclude": [
    "**/*.spec-types.ts"
    "**/*.test-types.ts"
]
```
For "run" the test you need to ejecute:
```bash 
tsc --noEmit *.(spec|test)-types.ts
```
Additionally, we recommend adding this command to your Husky pre-commit hook to ensure that any changes to these files are caught before they are committed to the repository.

These are the basic ways to create type tests with Readable-Types. Remember, testing your types is crucial to maintain robust and bug-free TypeScript code. Happy testing!

<br/>
<hr>
<br/>

## Compatibility
Readable-Types is compatible with TypeScript versions 4.2 and above.

## Roadmap
We're always working to improve and expand Readable-Types. Here's a sneak peek at what's coming up in future versions:
* More type utilities for common use cases
* Enhanced testing capabilities

## License
[MIT](https://github.com/Eythaann/readable-types/blob/master/LICENSE.txt)

## Authors
- [@eythaann](https://www.github.com/eythaann)

## Feedback
We're always looking to improve our library, and your feedback is essential to that process. If you have any suggestions, comments, or bug reports, please feel free to [open an issue](https://github.com/eythaann/readable-types/issues) on our GitHub repository. We appreciate your input and thank you for helping us make Readable Types even better!