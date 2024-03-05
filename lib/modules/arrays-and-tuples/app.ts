export type Shift<T> = T extends [infer Shifted, ...infer Rest] ? {
  extracted: Shifted;
  rest: Rest;
} : { extracted: never; rest: [] };

export type Pop<T> = T extends [...infer Rest, infer Poped] ? {
  extracted: Poped;
  rest: Rest;
} : { extracted: 0; rest: [] };

// @ts-ignore
export type forceConcat<T1, T2> = [...T1, ...T2];