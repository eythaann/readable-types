import { ToDecimal } from './addition';

import { Shift } from '../../../arrays-and-tuples/infrastructure';
import { split } from '../../../strings/infrastructure';

import { forceExtract, forceToString } from '../../../app';

interface BiggerTable {
  0: never;
  1: 0;
  2: this[1] | 1;
  3: this[2] | 2;
  4: this[3] | 3;
  5: this[4] | 4;
  6: this[5] | 5;
  7: this[6] | 6;
  8: this[7] | 7;
  9: this[8] | 8;
}

export type InternalBiggerThan<
  A_Tuple,
  B_Tuple,
  A_Length = forceExtract<A_Tuple, 'length'>,
  B_Length = forceExtract<B_Tuple, 'length'>,
> = A_Length extends B_Length
  ? A_Length extends 0
    ? false
    : ToDecimal<forceExtract<B_Tuple, 0>> extends forceExtract<BiggerTable, ToDecimal<forceExtract<A_Tuple, 0>>>
      ? true
      : A_Length extends 1
        ? false
        // @ts-ignore
        : InternalBiggerThan<Shift<A_Tuple>, Shift<B_Tuple>>
  : InternalBiggerThan<split<forceToString<A_Length>>, split<forceToString<B_Length>>>;
