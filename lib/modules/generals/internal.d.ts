import { IsAny } from '../any';
import { IsNever } from '../never';

declare global {
  namespace _RT {
    type IsType<
      TypeToTest,
      TypeToCast,
    > = IsAny<TypeToTest> extends true
      ? false
      : IsNever<TypeToTest> extends true
        ? false
        : [TypeToTest] extends [TypeToCast] ? true : false;
  }

  namespace _RT.Symbols {
    export const base: unique symbol;
    export const brand: unique symbol;
  }
}