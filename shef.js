/**
 * # Shef - a chef order management system.
 *
 * This is an exercise to help COMP1531 students learn integration testing. I
 * designed it as a replacement for the existing "pretty" exercise, in order to
 * more strongly reinforce best-practices for integration testing.
 *
 * This file contains the function interface and data store definition.
 *
 * Copyright (C) 2023 Miguel Guthridge
 */

const data = null; // FIXME: Create a data store

/**
 * Place an order, returning the order number for the given order.
 *
 * If there are no items in the order, an error should be given.
 *
 * @param {string[]} items a list of items in the order
 * @returns {{ orderNumber: number } | { error: string }} order number if order
 * was successful, otherwise an error message.
 */
export function placeOrder(items) {
  return {
    orderNumber: 1,
  };
}

/**
 * List all of the current (unfulfilled orders), providing both the order
 * numbers and items in the orders.
 *
 * @returns {{ orderNumber: number, items: string[] }[]} an array of orders.
 */
export function listOrders() {
  return [
    {
      orderNumber: 1,
      items: ['Tofu curry laksa'],
    },
  ];
}

/**
 * Mark an order as completed.
 *
 * If an order with this number doesn't exist, or it is already complete,
 * give an error message.
 *
 * @param {number} orderNumber the order number to mark as completed
 * @returns {{ items: string[] } | { error: string }} list of items in the
 * completed order, or an error message.
 */
export function completeOrder(orderNumber) {
  return { items: ['Tofu curry laksa'] };
}
