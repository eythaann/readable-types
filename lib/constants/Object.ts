declare type KeyOfObject = string | number | symbol;
declare type EmptyObject = { [key: KeyOfObject]: never }
declare type AnyObject = { [key: KeyOfObject]: any }
