
type binaryMap<T> = {
  1: false;
  0: unknown extends T ? true : false;
};

declare namespace internal.Binary {
  type IsUnknown<T> = binaryMap<T>[IsAny<T>];
}