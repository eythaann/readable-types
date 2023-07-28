declare namespace RT_INTERNAL.Binary {
  export type IsAny<T> = 0 extends (1 & T) ? 1 : 0;
}