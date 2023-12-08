import './readable-tests-for-types';

export type RT_CONFIG_SCHEME = {
  /** Enable development features. (default: false) */
  development?: boolean;
  /** Change the way of declare if statements. (default: natural) */
  conditionWay?: 'singleLine' | 'natural' | 'explicit';
  /** readable types testing configurations */
  testing?: {
    /** Regex of included filenames. */
    include?: readonly string[];
    /** Regex of excluded filenames. */
    exclude?: readonly string[];
  };
};

/** Internal utilities use at your own risk */
export * as _RT from './modules/app';
export * from './modules/infrastructure';