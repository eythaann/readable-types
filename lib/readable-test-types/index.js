globalThis.assertType = () => ({
  not: globalThis.assertType,
  awaited: globalThis.assertType,
  returned:  globalThis.assertType,
  equals(){},
  isSuperTypeOf(){},
  isSubTypeOf(){},
  toBeTrue(){},
  toBeFalse(){},
  toBeNever(){},
  toBeNull(){},
  toBeUndefined(){},
  toBeAny(){},
  toBeUnknow(){},
  toBeObject(){},
  toBeStrictObject(){},
  toBeFunction(){},
  toBeArray(){},
  toBeTuple(){},
  toBeTupleWithLength(){},
  toBeString(){},
  toBeNumber(){},
  toBeBoolean(){},
  toBePromise(){},
  toHaveProperty(){},
});

globalThis.testType = () => {};
globalThis.describeType = () => {};