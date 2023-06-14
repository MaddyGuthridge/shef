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

let data = {
  nextOrderNumber: 1, // The next order number to use
  orders: [], // An array of the current orders
};

/**
 * Helper function for looking up orders.
 *
 * In big projects, helper functions like this are extremely useful for writing
 * readable and maintainable code.
 */
function findOrder(orderNumber) {
  for (const order of data.orders) {
    if (order.orderNumber === orderNumber) {
      return order;
    }
  }
  // If we reach the end, say that there was no result by returning null
  return null;
}

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
  if (items.length === 0) {
    return { error: 'Order contains no items' };
  }
  // Increment the order number after storing the current value
  const orderNumber = data.nextOrderNumber++;
  // Add the new order to the data
  data.orders.push({
    orderNumber,
    items,
    complete: false,
  });
  return {
    orderNumber: orderNumber,
  };
}

/**
 * Returns details about the given order.
 *
 * If an order with this number doesn't exist, give an error message.
 *
 * @param {number} orderNumber the order number to mark as completed
 * @returns {{ items: string[], complete: boolean } | { error: string }} list
 * of items in the completed order, or an error message.
 */
export function orderDetails(orderNumber) {
  const order = findOrder(orderNumber);
  if (order === null) {
    return { error: 'Order number is invalid' };
  }
  return {
    items: order.items,
    complete: order.complete,
  };
}

/**
 * List all of the current (unfulfilled orders), providing both the order
 * numbers and items in the orders.
 *
 * @returns {{ orderNumber: number, items: string[] }[]} an array of orders.
 */
export function listOrders() {
  const currentOrders = [];
  // Filter the orders
  for (const order of data.orders) {
    // Only include the ones that aren't complete
    if (!order.complete) {
      currentOrders.push({
        orderNumber: order.orderNumber,
        items: order.items,
      });
    }
  }
  return currentOrders;
}

/**
 * Mark an order as completed.
 *
 * If an order with this number doesn't exist, or it is already complete,
 * give an error message.
 *
 * @param {number} orderNumber the order number to mark as completed
 * @returns {object | { error: string }} empty object, or an error message.
 */
export function completeOrder(orderNumber) {
  const order = findOrder(orderNumber);
  if (order === null) {
    return { error: 'Order number is invalid' };
  }
  if (order.complete) {
    return { error: 'Order has already been completed' };
  }
  // Since JS uses pass-by-reference for arrays and objects, modifying the
  // value here will also affect the data store
  order.complete = true;
  return {};
}

/**
 * Resets the program to its initial state.
 */
export function clear() {
  // Reset the data
  data = {
    nextOrderNumber: 1,
    orders: [],
  };
}
