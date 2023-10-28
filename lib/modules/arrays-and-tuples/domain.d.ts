/**
 * Create the representation of tuple type of n length.
 * Util for create baseType of tuple for be extended.
 */
export type nLengthTuple<type = unknown> = [] | [type, ...type[]];