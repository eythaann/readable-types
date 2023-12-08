globalThis.assertType = () => ({
  not: globalThis.assertType,
  awaited: globalThis.assertType,
  returned: globalThis.assertType,
  equals() {},
  isSuperTypeOf() {},
  isAssignableTo() {},
  isSubTypeOf() {},
  toBeTrue() {},
  toBeFalse() {},
  toBeNever() {},
  toBeNull() {},
  toBeUndefined() {},
  toBeAny() {},
  toBeUnknow() {},
  toBeObject() {},
  toBeStrictObject() {},
  toBeFunction() {},
  toBeArray() {},
  toBeTuple() {},
  toBeTupleWithLength() {},
  toBeString() {},
  toBeNumber() {},
  toBeBoolean() {},
  toBePromise() {},
  toHaveProperty() {},
  __internal: {
    shouldBe() {},
  },
});

globalThis.testType = () => {};
globalThis.describeType = () => {};