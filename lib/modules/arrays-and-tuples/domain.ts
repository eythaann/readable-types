declare global {
  /**
  * Create the representation of tuple type of n length.
  * Util for create baseType of tuple for be extended.
  */
  type nLengthTuple<type = unknown> = [type, ...type[]];
}

export {};