export type KeyOfObject = string | number | symbol;

export type EmptyObject = { [key in KeyOfObject]: never };
export type AnyObject = { [key in KeyOfObject]: any };
