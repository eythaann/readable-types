import { toJSON } from '../..';

import { SerializableByFn, SerializableBySelf } from '../../generals/domain';

export interface Serialize {
  toJSON(): toJSON<this>;
}

/** Constructor that return a serializable instance by `toJSON` method */
export type Serializable<T extends Constructor = Constructor> = T & Constructor<Serialize>;

/**
 * Typescript 5.0 decorator.
 */
export function Serialize<
  Class extends Constructor<SerializableBySelf<InstanceType<Class>> | SerializableByFn>,
>(Value: Class, _ctx?: ClassDecoratorContext<Class>): Serializable<Class> {
  Value.prototype.toJSON = function () {
    const { toJSON: _, ...instance } = this;
    try {
      return JSON.parse(JSON.stringify(instance));
    } catch {
      throw Error('`this` is not seriablizable by self, implement the method manually');
    }
  };
  return Value as any;
};
