export type KeyOfObject = string | number | symbol;

export type EmptyObject = { [key: KeyOfObject]: never };
export type AnyObject = { [key: KeyOfObject]: any };
