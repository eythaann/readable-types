export type ClassDecorator<
  Class extends Constructor = Constructor,
  NewClass extends Class = Class,
> = (Class: Class, ctx?: ClassDecoratorContext<Class>) => void | NewClass;

export class ClassBuilder<Class extends Constructor> {
  constructor(private Class: Class) {}

  /**
   *  Applies the decorators to a Class an return the result as the new constructor,
   *  in case of void will use the lastest constructor.
   *  This have a limit of 5 silbils to motivate to write readable code
   *  @example
   *  .decorate(Serialize, Deserialize)
   *  .decorate(Getters, Setters)
   *  .decorate(Logger)
   */
  decorate<T0 extends Class, T1 extends T0, T2 extends T1, T3 extends T2, T4 extends T3>(
    ...decorators: [
      ClassDecorator<Class, T0>,
      ClassDecorator<T0, T1>?,
      ClassDecorator<T1, T2>?,
      ClassDecorator<T2, T3>?,
      ClassDecorator<T3, T4>?,
    ]
  ): ClassBuilder<T4> {
    decorators.filter(Boolean).forEach((decorator) => {
      const fakeDecorator = (Class: Constructor, ctx: any) => decorator!(this.Class as any, ctx);
      @fakeDecorator
      class NewOne extends this.Class {}
      this.Class = NewOne;
    });
    return this as unknown as ClassBuilder<T4>;
  }

  build() {
    return this.Class;
  }
}
