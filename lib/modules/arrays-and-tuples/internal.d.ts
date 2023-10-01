declare namespace _RT.Array {
  type Shift<T> = T extends [infer Shifted, ...infer Rest] ? {
    extracted: Shifted;
    rest: Rest;
  } : { extracted: never; rest: [] };

  type Pop<T> = T extends [...infer Rest, infer Poped] ? {
    extracted: Poped;
    rest: Rest;
  } : { extracted: 0; rest: [] };

  // @ts-ignore
  type forceConcat<T1, T2> = [...T1, ...T2];
}