import { Cast } from '../generals';

type Bit = 0 | 1;
type BitString = '0' | '1';

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

type sumBit<
  _A,
  _B,
  CarryIn extends Bit,
  A extends Bit = StringToBit[Cast<_A, BitString>],
  B extends Bit = StringToBit[Cast<_B, BitString>],
  Sum extends Bit = RT_INTERNAL.Binary.XOR[RT_INTERNAL.Binary.XOR[A][B]][CarryIn],
  CarryOut extends Bit = RT_INTERNAL.Binary.OR[RT_INTERNAL.Binary.AND[A][B]][RT_INTERNAL.Binary.AND[CarryIn][RT_INTERNAL.Binary.XOR[A][B]]],
> = {
  sum: Sum;
  carryOut: CarryOut;
};

interface SUM {
  sum: Bit;
  carryOut: Bit;
}

type _splitInBits<T> = T extends `${infer _1}${infer _2}${infer _3}${infer _4}${infer _5}${infer _6}${infer _7}${infer _8}${infer _9}${infer _10}${infer _11}${infer _12}${infer _13}${infer _14}${infer _15}${infer _16}${infer _17}${infer _18}${infer _19}${infer _20}${infer _21}${infer _22}${infer _23}${infer _24}${infer _25}${infer _26}${infer _27}${infer _28}${infer _29}${infer _30}${infer _31}${infer _32}`
  ? [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32]
  : never;

interface sum32bit<
  _A extends string,
  _B extends string,
  CarryIn extends Bit = 0,

  A extends string[] = _splitInBits<_A>,
  B extends string[] = _splitInBits<_B>,

  _1 extends SUM = sumBit<A[31], B[31], CarryIn>,
  _2 extends SUM = sumBit<A[30], B[30], _1['carryOut']>,
  _3 extends SUM = sumBit<A[29], B[29], _2['carryOut']>,
  _4 extends SUM = sumBit<A[28], B[28], _3['carryOut']>,
  _5 extends SUM = sumBit<A[27], B[27], _4['carryOut']>,
  _6 extends SUM = sumBit<A[26], B[26], _5['carryOut']>,
  _7 extends SUM = sumBit<A[25], B[24], _6['carryOut']>,
  _8 extends SUM = sumBit<A[24], B[24], _7['carryOut']>,
  _9 extends SUM = sumBit<A[23], B[23], _8['carryOut']>,
  _10 extends SUM = sumBit<A[22], B[22], _9['carryOut']>,
  _11 extends SUM = sumBit<A[21], B[21], _10['carryOut']>,
  _12 extends SUM = sumBit<A[20], B[20], _11['carryOut']>,
  _13 extends SUM = sumBit<A[19], B[19], _12['carryOut']>,
  _14 extends SUM = sumBit<A[18], B[18], _13['carryOut']>,
  _15 extends SUM = sumBit<A[17], B[17], _14['carryOut']>,
  _16 extends SUM = sumBit<A[16], B[16], _15['carryOut']>,
  _17 extends SUM = sumBit<A[15], B[15], _16['carryOut']>,
  _18 extends SUM = sumBit<A[14], B[14], _17['carryOut']>,
  _19 extends SUM = sumBit<A[13], B[13], _18['carryOut']>,
  _20 extends SUM = sumBit<A[12], B[12], _19['carryOut']>,
  _21 extends SUM = sumBit<A[11], B[11], _20['carryOut']>,
  _22 extends SUM = sumBit<A[10], B[10], _21['carryOut']>,
  _23 extends SUM = sumBit<A[9], B[9], _22['carryOut']>,
  _24 extends SUM = sumBit<A[8], B[8], _23['carryOut']>,
  _25 extends SUM = sumBit<A[7], B[7], _24['carryOut']>,
  _26 extends SUM = sumBit<A[6], B[6], _25['carryOut']>,
  _27 extends SUM = sumBit<A[5], B[5], _26['carryOut']>,
  _28 extends SUM = sumBit<A[4], B[4], _27['carryOut']>,
  _29 extends SUM = sumBit<A[3], B[3], _28['carryOut']>,
  _30 extends SUM = sumBit<A[2], B[2], _29['carryOut']>,
  _31 extends SUM = sumBit<A[1], B[1], _30['carryOut']>,
  _32 extends SUM = sumBit<A[0], B[0], _31['carryOut']>,
> {
  carryOut: _32['carryOut'];
  sum: [
    _32['sum'],
    _31['sum'],
    _30['sum'],
    _29['sum'],
    _28['sum'],
    _27['sum'],
    _26['sum'],
    _25['sum'],
    _24['sum'],
    _23['sum'],
    _22['sum'],
    _21['sum'],
    _20['sum'],
    _19['sum'],
    _18['sum'],
    _17['sum'],
    _16['sum'],
    _15['sum'],
    _14['sum'],
    _13['sum'],
    _12['sum'],
    _11['sum'],
    _10['sum'],
    _9['sum'],
    _8['sum'],
    _7['sum'],
    _6['sum'],
    _5['sum'],
    _4['sum'],
    _3['sum'],
    _2['sum'],
    _1['sum'],
  ];
}

interface convert32BitsToHexadecimal<
  T extends number[],
> {
  _1: BinaryToHexaDecimal[Cast<`${T[0]}${T[1]}${T[2]}${T[3]}`, keyof BinaryToHexaDecimal>];
  _2: BinaryToHexaDecimal[Cast<`${T[4]}${T[5]}${T[6]}${T[7]}`, keyof BinaryToHexaDecimal>];
  _3: BinaryToHexaDecimal[Cast<`${T[8]}${T[9]}${T[10]}${T[11]}`, keyof BinaryToHexaDecimal>];
  _4: BinaryToHexaDecimal[Cast<`${T[12]}${T[13]}${T[14]}${T[15]}`, keyof BinaryToHexaDecimal>];
  _5: BinaryToHexaDecimal[Cast<`${T[16]}${T[17]}${T[18]}${T[19]}`, keyof BinaryToHexaDecimal>];
  _6: BinaryToHexaDecimal[Cast<`${T[20]}${T[21]}${T[22]}${T[23]}`, keyof BinaryToHexaDecimal>];
  _7: BinaryToHexaDecimal[Cast<`${T[24]}${T[25]}${T[26]}${T[27]}`, keyof BinaryToHexaDecimal>];
  _8: BinaryToHexaDecimal[Cast<`${T[28]}${T[29]}${T[30]}${T[31]}`, keyof BinaryToHexaDecimal>];
  result: `${this['_1']}${this['_2']}${this['_3']}${this['_4']}${this['_5']}${this['_6']}${this['_7']}${this['_8']}`;
}

interface convertHexadecimalTo32Bits<
  T extends string,
> {
  _V: T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}` ? [A, B, C, D, E, F, G, H] : never;
  _1: HexaDecimalToBinary[Cast<this['_V'][0], Hexadecimal>];
  _2: HexaDecimalToBinary[Cast<this['_V'][1], Hexadecimal>];
  _3: HexaDecimalToBinary[Cast<this['_V'][2], Hexadecimal>];
  _4: HexaDecimalToBinary[Cast<this['_V'][3], Hexadecimal>];
  _5: HexaDecimalToBinary[Cast<this['_V'][4], Hexadecimal>];
  _6: HexaDecimalToBinary[Cast<this['_V'][5], Hexadecimal>];
  _7: HexaDecimalToBinary[Cast<this['_V'][6], Hexadecimal>];
  _8: HexaDecimalToBinary[Cast<this['_V'][7], Hexadecimal>];
  result: `${this['_1']}${this['_2']}${this['_3']}${this['_4']}${this['_5']}${this['_6']}${this['_7']}${this['_8']}`;
}

type T = convertHexadecimalTo32Bits<'0000000a'>['result'];
type T2 = convertHexadecimalTo32Bits<'00000004'>['result'];

type T3 = sum32bit<T, T2>['sum'];

type T4 = convert32BitsToHexadecimal<T3>['result'];
type _T5 = convertHexadecimalTo32Bits<T4>['result'];

