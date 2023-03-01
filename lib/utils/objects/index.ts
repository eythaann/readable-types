import { AnyFunction, AnyObject } from "../../constants";
import { IsAny } from "../any";
import { IsNever } from "../never";
import { IsUnknown } from "../unknow";

export type IsObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
  : T extends AnyObject ? true
  : false;

export type IsStrictObject<T> = IsAny<T> extends true ? false
  : IsNever<T> extends true ? false
  : IsUnknown<T> extends true ? false
  : AnyObject extends T ? true
  : false;
