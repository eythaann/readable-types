import { Opaque, SoftOpaque } from './infrastructure';

describeType('Opaque', () => {
  testType('Should be asignable to it selft', () => {
    type UserID = Opaque<number, 'UserID'>;
    const userId: UserID = 123 as UserID;
    assertType<UserID>().equals<typeof userId>();
  });

  testType('Should not be asignable to its baseType', () => {
    type UserID = Opaque<number, 'UserID'>;
    assertType<UserID>().not.isAssignableTo<number>();
  });

  testType('Should its baseType not asignable to Opaque', () => {
    type UserID = Opaque<number, 'UserID'>;
    assertType<number>().not.isAssignableTo<UserID>();
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

describeType('SoftOpaque', () => {
  testType('Should be asignable to it selft', () => {
    type UserID = SoftOpaque<number, 'UserID'>;
    const userId: UserID = 123 as UserID;
    assertType<UserID>().equals<typeof userId>();
  });

  testType('Should be asignable to its baseType', () => {
    type UserID = SoftOpaque<number, 'UserID'>;
    assertType<UserID>().isAssignableTo<number>();
  });

  testType('Should its baseType not asignable to Opaque', () => {
    type UserID = SoftOpaque<number, 'UserID'>;
    assertType<number>().not.isAssignableTo<UserID>();
  });

  testType('Should differentiate between different opaque types', () => {
    type UserID = SoftOpaque<number, 'UserID'>;
    type OrderID = SoftOpaque<number, 'OrderID'>;

    const userId: UserID = 123 as UserID;
    const orderId: OrderID = 123 as OrderID;

    assertType<typeof userId>().not.equals<OrderID>();
    assertType<typeof orderId>().not.equals<UserID>();
  });
});
