import { SerializableByFn, SerializableBySelf, toJSON } from '../../../modules';

/** Constructor that return a deserializable instance by `fromJSON` static method */
export type Deserializable<T extends Constructor = Constructor> = T & {
  fromJSON(json: toJSON<InstanceType<T>>, ...args: ConstructorParameters<T>): InstanceType<T>;
};

/**
 * Typescript 5.0 decorator.
 */
export function Deserialize<
  Class extends Constructor<SerializableBySelf<InstanceType<Class>> | SerializableByFn>,
>(Value: Class, _ctx?: ClassDecoratorContext<Class>): Deserializable<Class> {
  Object.defineProperty(Value, 'fromJSON', {
    value(json: any, ...args: any) {
      return Object.assign(new Value(...args), json);
    },
  });
  return Value as any;
};