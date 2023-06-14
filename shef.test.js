/**
 * # Shef - a chef order management system.
 *
 * This is an exercise to help COMP1531 students learn integration testing. I
 * designed it as a replacement for the existing "pretty" exercise, in order to
 * more strongly reinforce best-practices for integration testing.
 *
 * This file contains integration tests for the app.
 *
 * Copyright (C) 2023 Miguel Guthridge
 */
// Import all the functions we need to use when writing our tests
import {
  placeOrder,
  orderDetails,
  listOrders,
  completeOrder,
  clear,
} from './shef';

// Before each test, we should reset our program so that there's no risk of
// tests interfering with each other
beforeEach(clear);

// Describe blocks are used to group tests together. In this case, we're
// grouping all the tests for the placeOrder function.
describe('placeOrder', () => {
  test('Places order when given valid items', () => {
    // Place an order
    const order = placeOrder(['Pasta']);
    // And make sure we were given an order number
    expect(order).toStrictEqual({
      // We don't know what order number we'll get specifically, so let's
      // just expect any number
      orderNumber: expect.any(Number),
    });
    // But we also need to check side effects - let's make sure we can view
    // the details of the order
    const details = orderDetails(order.orderNumber);
    // Since we only care about the items, and not any other properties,
    // we can use toMatchObject, which only checks the properties we provide
    expect(details).toMatchObject({ items: ['Pasta'] });
  });

  test('Order numbers are unique', () => {
    // Place two orders
    const order1 = placeOrder(['Caesar salad']);
    const order2 = placeOrder(['COMP1010 Original Roasted Potato']);
    // Make sure that they are different
    expect(order2.orderNumber).not.toStrictEqual(order1.orderNumber);
  });

  test('Error when order contains no items', () => {
    const order = placeOrder([]);
    // In this case, the function should give an error
    expect(order).toStrictEqual({
      error: 'Order contains no items',
    });
  });
});

describe('orderDetails', () => {
  test('Gives info for orders', () => {
    const order = placeOrder([
      "An icy-pole except it's actually a block of salt"
    ]);
    const details = orderDetails(order.orderNumber);
    expect(details).toStrictEqual({
      items: ["An icy-pole except it's actually a block of salt"],
      complete: false,
    });
  });

  test('Gives an error for invalid order numbers', () => {
    // We don't even need to place an order to test this
    expect(orderDetails(-1)).toStrictEqual({
      error: 'Order number is invalid',
    });
  });
});

describe('listOrders', () => {
  test('Lists placed orders', () => {
    const orderNum1 = placeOrder(['Pasta', 'More pasta']).orderNumber;
    const orderNum2 = placeOrder(["What she's having"]).orderNumber;

    const orders = listOrders();
    expect(orders).toStrictEqual([
      {
        orderNumber: orderNum1,
        items: ['Pasta', 'More pasta'],
      },
      {
        orderNumber: orderNum2,
        items: ["What she's having"],
      },
    ]);
  });

  test('Gives empty array when no orders are placed', () => {
    expect(listOrders()).toStrictEqual([]);
  });

  test("Doesn't include orders that are already completed", () => {
    const orderNum = placeOrder(['Cheese']).orderNumber;
    // Let's mark this order as completed
    completeOrder(orderNum);
    // Make sure it's not listed
    expect(listOrders()).toStrictEqual([]);
  });
});

describe('completeOrder', () => {
  test('Marks order as completed', () => {
    const orderNum = placeOrder(['More cheese']).orderNumber;
    // Let's mark this order as completed
    const result = completeOrder(orderNum);
    // Also make sure it returns the right data (an empty object)
    expect(result).toStrictEqual({});
    // Make sure that the details say it is completed
    expect(orderDetails(orderNum)).toStrictEqual({
      items: ['More cheese'],
      complete: true,
    });
  });

  test('Gives an error for invalid order numbers', () => {
    expect(completeOrder(-1)).toStrictEqual({
      error: 'Order number is invalid',
    });
  });

  test('Gives an error for already-completed orders', () => {
    const orderNum = placeOrder(['Even more cheese', 'Pasta']).orderNumber;
    // Let's mark this order as completed
    completeOrder(orderNum);
    // When we try to mark it as completed again, we should get an error
    expect(completeOrder(orderNum)).toStrictEqual({
      error: 'Order has already been completed',
    });
  });
});

describe('clear', () => {
  test('Orders are deleted', () => {
    const orderNum = placeOrder(['Desert, the sandy kind']).orderNumber;
    // Reset the app
    clear();
    // The order shouldn't exist anymore
    expect(orderDetails(orderNum)).toStrictEqual({
      error: 'Order number is invalid',
    });
  });
});
