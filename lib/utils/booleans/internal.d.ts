declare namespace RT_INTERNAL.Binary {
  interface XOR {
    0: {
      1: 1;
      0: 0;
    };
    1: {
      1: 0;
      0: 1;
    };
  }

  interface AND {
    0: {
      1: 0;
      0: 0;
    };
    1: {
      1: 1;
      0: 0;
    };
  }

  interface OR {
    0: {
      1: 1;
      0: 0;
    };
    1: {
      1: 1;
      0: 1;
    };
  }

  interface toBoolean {
    0: false;
    1: true;
  }
}