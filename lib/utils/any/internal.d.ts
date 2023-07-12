declare namespace internal.Binary {
  export type IsAny<T> = 0 extends (1 & T) ? 1 : 0;
}