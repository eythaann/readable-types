import { ForceExtract } from '../app';

export type Call<$Generic, Args> = ForceExtract<($Generic & { args: Args } & {
  [K in Exclude<keyof Args, keyof []>]: Args[K]
}), 'return'>;