declare namespace RT_INTERNAL.Array {
  interface shiftedTuple<T = unknown> {
    extracted: T;
    rest: T[];
  }

  type Shift<T extends unknown[]> = {
    extracted: T extends [infer R, ...infer _] ? R : never;
    rest: T extends [infer _, ...infer R] ? R : [];
  };

  type Pop<T extends unknown[]> = {
    extracted: T extends [...infer _, infer R] ? R : never;
    rest: T extends [...infer R, infer _] ? R : [];
  };
}