declare const $ARGS: unique symbol;
declare const $BINDED_ARGS: unique symbol;

export type $ARGS = typeof $ARGS;
export type $BINDED_ARGS = typeof $BINDED_ARGS;

declare global {
  /**
   * @rt_keyowrd
   *
   * `$` is a generic utility type intended to be used as a base for creating High Kinded Types (HKT).
   * It encapsulates the arguments and return type of a function, allowing for advanced type manipulation
   * and transformations within the TypeScript type system.
   *
   * @template Args - A tuple or an object representing the arguments of a function or type constructor.
   *                   If it is a tuple, each element of the tuple represents a type argument.
   *                   If it is an object, each property of the object represents a named type argument.
   * @property args - A tuple or an object capturing the type arguments provided to the HKT.
   * @property return - The return type of the HKT.
   *
   * Additionally, all the properties from the `Args` parameter are spread onto the `$` type itself,
   * allowing for direct access to these properties.
   *
   * The `$` type is intended to be extended by specific implementations of HKTs to enable advanced type-level
   * computations and transformations.
   *
   * @example
   * // Using a tuple for Args
   * type MyHKT = $<[number, string]>;
   * // MyHKT is now { args: [number, string]; return: unknown; 0: number; 1: string; }
   *
   * @example
   * // Using an object for Args
   * type MyNamedHKT = $<{ x: number; y: string }>;
   * // MyNamedHKT is now { args: { x: number; y: string }; return: unknown; x: number; y: string; }
   */
  type $<Args extends [] | nLengthTuple | unknownObject = []> = {
    [$ARGS]: Args;
    [x: number]: unknown;
    return: unknown;
  } & {
    [K in Exclude<keyof Args, keyof []>]: Args[K];
  };
}