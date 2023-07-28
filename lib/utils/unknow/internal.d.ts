type binaryMap<T> = {
  1: false;
  0: unknown extends T ? true : false;
};

declare namespace RT_INTERNAL.Binary {
  type IsUnknown<T> = binaryMap<T>[IsAny<T>];
}