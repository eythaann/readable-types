type binaryMap<T> = {
  1: false;
  0: unknown extends T ? true : false;
};

declare namespace _RT.Binary {
  type IsUnknown<T> = binaryMap<T>[IsAny<T>];
}