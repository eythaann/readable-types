import { Cast, KeysOfUnion, Opaque, UnionToIntersection, ValueOf, WeakOpaque } from '.';

describeType('ValueOf', () => {
  testType('Should return the union of the value types', [
    assertType<ValueOf<{ a: number; b: string }>>().equals<number | string>(),
    assertType<ValueOf<{ a: any; b: unknown }>>().toBeAny(),
    assertType<ValueOf<{ a: never; b: never }>>().toBeNever(),
  ]);
});

describeType('KeysOfUnion', () => {
  testType('Should return the union of the keys of the object types in the union', [
    assertType<KeysOfUnion<{ a: number; b: string } | { c: boolean }>>().equals<'a' | 'b' | 'c'>(),
    assertType<KeysOfUnion<{ a: any } | { b: unknown }>>().equals<'a' | 'b'>(),
    assertType<KeysOfUnion<{ a: never } | { b: never }>>().equals<'a' | 'b'>(),
  ]);
});

describeType('UnionToIntersection', () => {
  testType('Should return a single object type with the union of keys and values', [
    assertType<UnionToIntersection<{ a: number; b: string } | { a: string; c: boolean }>>().equals<{ a: number | string; b: string; c: boolean }>(),
    assertType<UnionToIntersection<{ a: any } | { b: unknown }>>().equals<{ a: any; b: unknown }>(),
    assertType<UnionToIntersection<{ a: never } | { b: never }>>().equals<{ a: never; b: never }>(),
  ]);
});

describeType('Cast', () => {
  testType('Should cast T to U if T is not a subtype of U', [
    assertType<Cast<string, number>>().equals<number>(),
  ]);

  testType('Should return T if T is a subtype of U', [
    assertType<Cast<'a', string>>().equals<'a'>(),
    assertType<Cast<5, number>>().equals<5>(),
  ]);

  testType('Should allow casting to union types', [
    assertType<Cast<number, number | string>>().equals<number>(),
  ]);

  testType('Should cast arrays to broader array types', [
    assertType<Cast<number[], any[]>>().equals<number[]>(),
  ]);
});

describeType('Opaque', () => {
  testType('Should be asignable to it selft', () => {
    type UserID = Opaque<number, 'UserID'>;
    const userId: UserID = 123 as UserID;
    assertType<UserID>().equals<typeof userId>();
  });

  testType('Should not be asignable to its baseType', () => {
    type UserID = Opaque<number, 'UserID'>;
    assertType<UserID>().not.isSubTypeOf<number>();
  });

  testType('Should its baseType not asignable to Opaque', () => {
    type UserID = Opaque<number, 'UserID'>;
    assertType<UserID>().not.isSuperTypeOf<number>();
  });

  testType('Should differentiate between different opaque types', () => {
    type UserID = Opaque<number, 'UserID'>;
    type OrderID = Opaque<number, 'OrderID'>;

    const userId: UserID = 123 as UserID;
    const orderId: OrderID = 123 as OrderID;

    assertType<typeof userId>().not.equals<OrderID>();
    assertType<typeof orderId>().not.equals<UserID>();
  });
});

describeType('WeakOpaque', () => {
  testType('Should be asignable to it selft', () => {
    type UserID = WeakOpaque<number, 'UserID'>;
    const userId: UserID = 123 as UserID;
    assertType<UserID>().equals<typeof userId>();
  });

  testType('Should be asignable to its baseType', () => {
    type UserID = WeakOpaque<number, 'UserID'>;
    assertType<UserID>().isSubTypeOf<number>();
  });

  testType('Should its baseType not asignable to Opaque', () => {
    type UserID = WeakOpaque<number, 'UserID'>;
    assertType<UserID>().not.isSuperTypeOf<number>();
  });

  testType('Should differentiate between different opaque types', () => {
    type UserID = WeakOpaque<number, 'UserID'>;
    type OrderID = WeakOpaque<number, 'OrderID'>;

    const userId: UserID = 123 as UserID;
    const orderId: OrderID = 123 as OrderID;

    assertType<typeof userId>().not.equals<OrderID>();
    assertType<typeof orderId>().not.equals<UserID>();
  });
});