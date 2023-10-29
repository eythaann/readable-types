/** @deprecated use offical type PropertyKey instead */
export type KeyOfObject = PropertyKey;

/** @deprecated unsafe use unknownObject instead */
export type AnyObject = { [key in PropertyKey]: any };

declare global {
  type uObject = unknownObject;
  type unknownObject = { [key in PropertyKey]: unknown };

  type emptyObject = { [key in PropertyKey]: never };
}