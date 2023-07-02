import { Tuple } from '../arrays';
import { And, Or, XOR } from '../booleans';
import { _Cast } from '../generals/HTK';

/* export type Add<A extends number, B extends number> = [...Tuple<unknown, A>, ...Tuple<unknown, B>]['length'];

export type Subtract<A extends number, B extends number> = Tuple<unknown, A> extends [...(infer U), ...Tuple<unknown, B>]
  ? U['length']
  : never;

export type t = Subtract<40, 30>;

type a = Tuple<unknown, 23>; */

type Bit = '0' | '1';

interface BitToBoolean {
  0: false;
  1: true;
}

interface _XOR {
  0: {
    1: 1;
    0: 0;
  };
  1: {
    1: 0;
    0: 1;
  };
}

interface _AND {
  0: {
    1: 0;
    0: 0;
  };
  1: {
    1: 1;
    0: 0;
  };
}

interface _OR {
  0: {
    1: 1;
    0: 0;
  };
  1: {
    1: 1;
    0: 1;
  };
}

interface StringToBit {
  '0': 0;
  '1': 1;
}

interface BinaryToHexaDecimal {
  '0000': '0';
  '0001': '1';
  '0010': '2';
  '0011': '3';
  '0100': '4';
  '0101': '5';
  '0110': '6';
  '0111': '7';
  '1000': '8';
  '1001': '9';
  '1010': 'a';
  '1011': 'b';
  '1100': 'c';
  '1101': 'd';
  '1110': 'e';
  '1111': 'f';
}

type HexaDecimalToBinary = {
  [Key in keyof BinaryToHexaDecimal as BinaryToHexaDecimal[Key]]: Key
};

type Hexadecimal = keyof HexaDecimalToBinary;

type BooleanToBit<Boolean> = Boolean extends true ? 1 : 0;

/* interface sumBit<A, B, CarryIn extends boolean> {
  A: BitToBoolean[StringToBit[_Cast<A, '1' | '0'>]];
  B: BitToBoolean[StringToBit[_Cast<B, '1' | '0'>]];
  sum: BooleanToBit<XOR<[XOR<[this['A'], this['B']]>, CarryIn]>>;
  carryOut: Or<[And<[this['A'], this['B']]>, And<[CarryIn, XOR<[this['A'], this['B']]>]>]>;
}; */

interface sumBit<
  _A,
  _B,
  CarryIn,
  A extends 0 | 1 = StringToBit[_Cast<_A, Bit>],
  B extends 0 | 1 = StringToBit[_Cast<_B, Bit>]
> {
  sum: _XOR[_XOR[A][B]][BooleanToBit<CarryIn>];
  carryOut: BitToBoolean[_OR[_AND[A][B]][_AND[BooleanToBit<CarryIn>][_XOR[A][B]]]];
};

interface sum32bit<
  _A extends string,
  _B extends string,
  CarryIn extends boolean = false,
  A extends string[] = _A extends `${infer _1}${infer _2}${infer _3}${infer _4}${infer _5}${infer _6}${infer _7}${infer _8}${infer _9}${infer _10}${infer _11}${infer _12}${infer _13}${infer _14}${infer _15}${infer _16}${infer _17}${infer _18}${infer _19}${infer _20}${infer _21}${infer _22}${infer _23}${infer _24}${infer _25}${infer _26}${infer _27}${infer _28}${infer _29}${infer _30}${infer _31}${infer _32}`
    ? [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32]
    : never,
  B extends string[] = _B extends `${infer _1}${infer _2}${infer _3}${infer _4}${infer _5}${infer _6}${infer _7}${infer _8}${infer _9}${infer _10}${infer _11}${infer _12}${infer _13}${infer _14}${infer _15}${infer _16}${infer _17}${infer _18}${infer _19}${infer _20}${infer _21}${infer _22}${infer _23}${infer _24}${infer _25}${infer _26}${infer _27}${infer _28}${infer _29}${infer _30}${infer _31}${infer _32}`
    ? [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32]
    : never,
> {
  _1: sumBit<A[31], B[31], CarryIn>;
  _2: sumBit<A[30], B[30], this['_1']['carryOut']>;
  _3: sumBit<A[29], B[29], this['_2']['carryOut']>;
  _4: sumBit<A[28], B[28], this['_3']['carryOut']>;
  _5: sumBit<A[27], B[27], this['_4']['carryOut']>;
  _6: sumBit<A[26], B[26], this['_5']['carryOut']>;
  _7: sumBit<A[25], B[24], this['_6']['carryOut']>;
  _8: sumBit<A[24], B[24], this['_7']['carryOut']>;
  _9: sumBit<A[23], B[23], this['_8']['carryOut']>;
  _10: sumBit<A[22], B[22], this['_9']['carryOut']>;
  _11: sumBit<A[21], B[21], this['_10']['carryOut']>;
  _12: sumBit<A[20], B[20], this['_11']['carryOut']>;
  _13: sumBit<A[19], B[19], this['_12']['carryOut']>;
  _14: sumBit<A[18], B[18], this['_13']['carryOut']>;
  _15: sumBit<A[17], B[17], this['_14']['carryOut']>;
  _16: sumBit<A[16], B[16], this['_15']['carryOut']>;
  _17: sumBit<A[15], B[15], this['_16']['carryOut']>;
  _18: sumBit<A[14], B[14], this['_17']['carryOut']>;
  _19: sumBit<A[13], B[13], this['_18']['carryOut']>;
  _20: sumBit<A[12], B[12], this['_19']['carryOut']>;
  _21: sumBit<A[11], B[11], this['_20']['carryOut']>;
  _22: sumBit<A[10], B[10], this['_21']['carryOut']>;
  _23: sumBit<A[9], B[9], this['_22']['carryOut']>;
  _24: sumBit<A[8], B[8], this['_23']['carryOut']>;
  _25: sumBit<A[7], B[7], this['_24']['carryOut']>;
  _26: sumBit<A[6], B[6], this['_25']['carryOut']>;
  _27: sumBit<A[5], B[5], this['_26']['carryOut']>;
  _28: sumBit<A[4], B[4], this['_27']['carryOut']>;
  _29: sumBit<A[3], B[3], this['_28']['carryOut']>;
  _30: sumBit<A[2], B[2], this['_29']['carryOut']>;
  _31: sumBit<A[1], B[1], this['_30']['carryOut']>;
  _32: sumBit<A[0], B[0], this['_31']['carryOut']>;
  carryOut: this['_32']['carryOut'];
  sum: [
    /* this['_32']['sum'],
    this['_31']['sum'],
    this['_30']['sum'],
    this['_29']['sum'],
    this['_28']['sum'],
    this['_27']['sum'],
    this['_26']['sum'],
    this['_25']['sum'],
    this['_24']['sum'],
    this['_23']['sum'],
    this['_22']['sum'],
    this['_21']['sum'],
    this['_20']['sum'],
    this['_19']['sum'],
    this['_18']['sum'],
    this['_17']['sum'],
    this['_16']['sum'],
    this['_15']['sum'], */
    this['_14']['sum'],
    this['_13']['sum'],
    this['_12']['sum'],
    this['_11']['sum'],
    this['_10']['sum'],
    this['_9']['sum'],
    this['_8']['sum'],
    this['_7']['sum'],
    this['_6']['sum'],
    this['_5']['sum'],
    this['_4']['sum'],
    this['_3']['sum'],
    this['_2']['sum'],
    this['_1']['sum'],
  ];
}

interface convert32BitsToHexadecimal<
  _T extends string,
  T extends string[] = _T extends `${infer _1}${infer _2}${infer _3}${infer _4}${infer _5}${infer _6}${infer _7}${infer _8}${infer _9}${infer _10}${infer _11}${infer _12}${infer _13}${infer _14}${infer _15}${infer _16}${infer _17}${infer _18}${infer _19}${infer _20}${infer _21}${infer _22}${infer _23}${infer _24}${infer _25}${infer _26}${infer _27}${infer _28}${infer _29}${infer _30}${infer _31}${infer _32}`
    ? [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32]
    : never,
> {
  _1: BinaryToHexaDecimal[_Cast<`${T[0]}${T[1]}${T[2]}${T[3]}`, keyof BinaryToHexaDecimal>];
  _2: BinaryToHexaDecimal[_Cast<`${T[4]}${T[5]}${T[6]}${T[7]}`, keyof BinaryToHexaDecimal>];
  _3: BinaryToHexaDecimal[_Cast<`${T[8]}${T[9]}${T[10]}${T[11]}`, keyof BinaryToHexaDecimal>];
  _4: BinaryToHexaDecimal[_Cast<`${T[12]}${T[13]}${T[14]}${T[15]}`, keyof BinaryToHexaDecimal>];
  _5: BinaryToHexaDecimal[_Cast<`${T[16]}${T[17]}${T[18]}${T[19]}`, keyof BinaryToHexaDecimal>];
  _6: BinaryToHexaDecimal[_Cast<`${T[20]}${T[21]}${T[22]}${T[23]}`, keyof BinaryToHexaDecimal>];
  _7: BinaryToHexaDecimal[_Cast<`${T[24]}${T[25]}${T[26]}${T[27]}`, keyof BinaryToHexaDecimal>];
  _8: BinaryToHexaDecimal[_Cast<`${T[28]}${T[29]}${T[30]}${T[31]}`, keyof BinaryToHexaDecimal>];
  result: `${this['_1']}${this['_2']}${this['_3']}${this['_4']}${this['_5']}${this['_6']}${this['_7']}${this['_8']}`;
}

interface convertHexadecimalTo32Bits<
  T extends string,
> {
  _V: T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}` ? [A, B, C, D, E, F, G, H] : never;
  _1: HexaDecimalToBinary[_Cast<this['_V'][0], Hexadecimal>];
  _2: HexaDecimalToBinary[_Cast<this['_V'][1], Hexadecimal>];
  _3: HexaDecimalToBinary[_Cast<this['_V'][2], Hexadecimal>];
  _4: HexaDecimalToBinary[_Cast<this['_V'][3], Hexadecimal>];
  _5: HexaDecimalToBinary[_Cast<this['_V'][4], Hexadecimal>];
  _6: HexaDecimalToBinary[_Cast<this['_V'][5], Hexadecimal>];
  _7: HexaDecimalToBinary[_Cast<this['_V'][6], Hexadecimal>];
  _8: HexaDecimalToBinary[_Cast<this['_V'][7], Hexadecimal>];
  result: `${this['_1']}${this['_2']}${this['_3']}${this['_4']}${this['_5']}${this['_6']}${this['_7']}${this['_8']}`;
}

type T = convertHexadecimalTo32Bits<'00000001'>['result'];
type T2 = convertHexadecimalTo32Bits<'00000001'>['result'];

type T3 = sum32bit<'00000000000000000000000000000001', '00000000000000000000000000000001'>['sum'];

type T_1 = convert32BitsToHexadecimal<T>['result'];
type T_2 = convertHexadecimalTo32Bits<T_1>['result'];
