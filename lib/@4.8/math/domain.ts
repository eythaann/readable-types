export type DecimalHashMap = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  2: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
  3: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
  4: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
  5: [5, 6, 7, 8, 9, 0, 1, 2, 3, 4];
  6: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
  7: [7, 8, 9, 0, 1, 2, 3, 4, 5, 6];
  8: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7];
  9: [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};

export interface CarryOnAddition {
  0: never;
  1: 9;
  2: this[1] | 8;
  3: this[2] | 7;
  4: this[3] | 6;
  5: this[4] | 5;
  6: this[5] | 4;
  7: this[6] | 3;
  8: this[7] | 2;
  9: this[8] | 1;
}