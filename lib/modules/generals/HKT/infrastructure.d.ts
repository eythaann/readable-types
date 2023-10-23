import { $ } from './domain';
import { Call as _Call } from './app';

/**
 * `Call` is a utility type that emulates the behavior of calling a function in JavaScript,
 * but at the type level for High Kinded Types (HKTs) in TypeScript. It takes a generic High Kinded Type
 * and a set of arguments, and extracts the return type of the HKT when called with those arguments.
 *
 * @template $Generic - A High Kinded Type, which follows the structure of the `$` type, encapsulating
 *                      the arguments and return type of a function or type constructor.
 * @template Args - The arguments to be passed to the High Kinded Type. This should match the structure
 *                  expected by `$Generic`.
 *
 * This makes `Call` a powerful utility for working with High Kinded Types in TypeScript, allowing for
 * advanced type-level computations and transformations.
 * @example
 * interface MyHKT extends $<{ T: unknown }> {
 *   return: this['T'] extends number ? string : number;
 * }
 * type Result = Call<MyHKT, { T: number }>; // Result is string
 */
export type Call<$Generic extends $<unknown[] | Record<string, unknown>>, Args extends $Generic['args']> = _Call<$Generic, Args>;