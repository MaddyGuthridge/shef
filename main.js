/**
 * # Shef - a chef order management system.
 *
 * This is an exercise to help COMP1531 students learn integration testing. I
 * designed it as a replacement for the existing "pretty" exercise, in order to
 * more strongly reinforce best-practices for integration testing.
 *
 * This file contains the command-line interface (CLI) for the app.
 *
 * Copyright (C) 2023 Miguel Guthridge
 */
import PromptSync from 'prompt-sync';
import {
  placeOrder,
  orderDetails,
  completeOrder,
  listOrders,
} from './shef.js';

/**
 * Helper function for handling errors
 *
 * If there is an error, it prints it out and returns true
 *
 * Otherwise, it returns false
 */
function handleError(response) {
  if (response.error !== undefined) {
    console.log(`ERROR: ${response.error}`);
    return true;
  }
  return false;
}

/**
 * Helper function for handling the place order command
 */
function cmdPlaceOrder(options) {
  // Perform some tidying up of the user input
  // You don't need to understand this
  const items = options
    .split(';') // Split it up into the various items
    .map(s => s.trim()) // Trim any extra whitespace
    .filter(s => s.length); // Filter out empty strings
  // Then place the order
  const order = placeOrder(items);
  // Only tell them their order number if there was no error
  if (!handleError(order)) {
    console.log(`Your order number: ${order.orderNumber}`);
  }
}

/**
 * Helper function for handling the order details command
 */
function cmdOrderDetails(options) {
  const orderNumber = parseInt(options);
  const result = orderDetails(orderNumber);
  if (!handleError(result)) {
    // Join together all the items in the order
    const items = result.items.join(' and ');
    // Make a string for whether it's completed or not
    const complete = result.complete ? 'Complete' : 'Not complete';
    // Use a `backtick-quoted string` to embed values directly within it
    console.log(`Order ${orderNumber}: ${items}. ${complete}`);
  }
}

function cmdListOrders() {
  const orders = listOrders();
  console.log('Current orders:');
  for (const order of orders) {
    const items = order.items.join(' and ');
    console.log(`${order.orderNumber}: ${items}`);
  }
}

function cmdCompleteOrder(options) {
  const orderNumber = parseInt(options);
  const result = completeOrder(orderNumber);
  if (!handleError(result)) {
    console.log(`Completed order ${orderNumber}`);
  }
}

const prompt = PromptSync();

console.log('Welcome to shef!');
console.log('Options:');
console.log('$ o [items (semicolon-delimited)] -- Place an order');
console.log('$ d [order number] -- Print the order details');
console.log('$ l -- List all current orders');
console.log('$ c [order number] -- Mark an order as complete');
console.log('$ Ctrl+C -- Exit');
console.log();

while (true) {
  const input = prompt('$ ');
  if (input === null || input === '') {
    // Ctrl+C
    console.log('Goodbye!');
    process.exit(0);
  }

  let cmdIndex = input.indexOf(' ');
  if (cmdIndex === -1) {
    cmdIndex = input.length;
  }

  const command = input.slice(0, cmdIndex);
  const options = input.slice(cmdIndex + 1);

  switch (command) {
    case 'o':
      cmdPlaceOrder(options);
      break;
    case 'd':
      cmdOrderDetails(options);
      break;
    case 'l':
      cmdListOrders();
      break;
    case 'c':
      cmdCompleteOrder(options);
      break;
    default:
      console.log('Unknown command', command);
  }
}
