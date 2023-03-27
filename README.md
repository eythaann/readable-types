# Readable-Types
With Readable-Types, you can create TypeScript types that are easy to read and understand. The library provides a set of intuitive and expressive utilities for defining complex types, reducing the need for manual type checking and making your code more reliable.

Whether you're building a small project or a large enterprise application, Readable Types can help you save time and reduce errors by providing a more readable and maintainable way to define your types.

In addition to making type creation more manageable, Readable Types also includes a suite of testing utilities to help ensure that your types are correct and reliable. With support for both unit and integration testing, you can rest assured that your types are functioning as expected.

Get started with Readable Types today and take the first step toward a more readable, reliable, and maintainable codebase!

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

## Usage
Our library provides a comprehensive set of TypeScript utility functions that are ready to use out of the box. Simply import the library into your project or file, and its all!.

## Testing
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
## License
[MIT](https://github.com/Eythaann/readable-types/blob/master/LICENSE.txt)

## Authors
- [@eythaann](https://www.github.com/eythaann)

## Feedback
We're always looking to improve our library, and your feedback is essential to that process. If you have any suggestions, comments, or bug reports, please feel free to [open an issue](https://github.com/eythaann/readable-types/issues) on our GitHub repository. We appreciate your input and thank you for helping us make Readable Types even better!