import { NewType } from './domain';

declare global {
  /**
   * @rt_keyword
   *
   * Represents a newtype wrapper that creates a unique type based on an existing type.
   * The newtype pattern is used to create distinct types that are structurally identical
   * to another type, but are treated as separate types by the TypeScript type system.
   * This is useful for adding type safety to your code by preventing accidental
   * mixing of types that are structurally similar but conceptually different.
   *
   * @template identifier - A unique symbol that acts as a unique identifier for the newtype.
   *
   * @example
   * declare const structure_indentifier: unique symbol;
   *
   * // structure will represent a object without prototype
   * type structure = newtype <typeof structure_indentifier>;
   * type struct<T extends unknownObject> = structure & T;
   *
   * type Tree<T> = struct<{
   *   value: T | null;
   *   left?: Tree<T>;
   *   right?: Tree<T>;
   * }>;
   *
   * function struct<T extends unknownObject | structure>(obj: T): structure & T {
   *   return Object.assign(Object.create(null), obj);
   * }
   *
   * const mytree: Tree<number> = struct({ value: 0 });
   */
  type newtype<identifier> = NewType<identifier>;
}

/**
 * Creates an opaque type, ensuring that values of the base type cannot be
 * directly assigned to the opaque type, and vice versa.
 *
 * An opaque type is a type that wraps around another type (the base type),
 * adding a unique "brand" to differentiate it. This pattern is useful
 * for creating distinct types that are based on the same underlying type.
 *
 * @template base - The underlying type of the opaque type.
 * @template identifier - A unique brand to differentiate the opaque type from its base type.
 *
 * @example
 * type UserID = Opaque<number, 'UserID'>;
 *
 * const userId: UserID = 123 as UserID;
 *
 * const anotherUserId: UserID = 456; // Error
 * const someNumber: number = 456 as UserID; // Error
 */
export type Opaque<base, identifier> = (base & newtype<identifier>) | newtype<identifier>;

/**
 * Creates an brand type, ensuring that values of the base type cannot be
 * directly assigned to the opaque type, but itseft is asignable to its base type.
 */
export type SoftOpaque<base, identifier> = base & newtype<identifier>;