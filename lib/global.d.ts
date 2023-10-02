import { ForceExtract } from './modules/app';
import { AnyObject, DefaultOnUnknown } from './modules/infrastructure';
import { IValidations, TestsCallback } from './readable-test-types';

declare global {
  function describeType(description: string, cb: () => void): void;
  function testType(description: string, tests: AnyObject | TestsCallback): void;
  function assertType<T>(): IValidations<T>;

  interface INTERNAL_RT_CONFIG {
    development: DefaultOnUnknown<ForceExtract<RT_CONFIG, 'development'>, false>;
    conditionWay: DefaultOnUnknown<ForceExtract<RT_CONFIG, 'conditionWay'>, 'natural'>;
  }

  interface RT_CONFIG {}

  type RT_CONFIG_SCHEME<T extends {
    development?: boolean;
    conditionWay?: 'singleLine' | 'natural' | 'explicit'; // future 2.0
  }> = T;
}