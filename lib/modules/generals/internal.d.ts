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
}