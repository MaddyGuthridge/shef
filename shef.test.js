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

describe('placeOrder', () => {
  test.todo('Places order when given valid items');
  test.todo('Order numbers are unique');
  test.todo('Error when order contains no items');
});

describe('orderDetails', () => {
  test.todo('Gives info for orders');
  test.todo('Gives an error for invalid order numbers');
});

describe('listOrders', () => {
  test.todo('Lists placed orders');
  test.todo('Gives empty array when no orders are placed');
  test.todo("Doesn't include orders that are already completed");
});

describe('completeOrder', () => {
  test.todo('Marks order as completed');
  test.todo('Gives an error for invalid order numbers');
  test.todo('Gives an error for already-completed orders');
});

describe('clear', () => {
  test.todo('Orders are deleted');
});
