/** @deprecated use offical type PropertyKey instead */
export type KeyOfObject = PropertyKey;

declare global {
  type uObject = unknownObject;
  type unknownObject = { [key in PropertyKey]: unknown };

  type anyObject = { [key in PropertyKey]: any };

  type emptyObject = { [key in PropertyKey]: never };
}