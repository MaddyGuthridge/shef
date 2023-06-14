
# Chef order management system

Allows users to input orders and receive an order number, then allows a chef to
read those orders and mark them as fulfilled.

This is an exercise to help COMP1531 students learn integration testing. I
designed it as a replacement for the existing [pretty](../pretty/README.md)
exercise, in order to more strongly reinforce best-practices for integration
testing.

## Your task

In order to complete this exercise, you should.

### 1. Setup

1. Read the provided function stubs to understand the task

2. Install development dependencies (`npm i -D [package-names]`)

    * `@babel/preset-env` - Provides support for code transpilation so we can
      use the latest and greatest JS features.
    * `jest` - A powerful testing framework we can use to validate our
      implementation.
    * `@types/jest` - Type definitions for Jest, which get us better editor
      support in VS Code.

### 2. Tests

1. Write a test list. Use `describe` and `test.todo` to create a structure for
   all the tests we plan on writing.

2. Implement the tests by calling the function stubs and checking both the
   return values and the side effects.

3. Run the tests and observe that they all fail.

### 3. Implementation

1. Write an implementation of the code, using test-driven development to
   validate our work.
2. Write a CLI (command-line interface) using the `prompt-sync` library to
   allow users to interact with the library using their terminal.

Here is an example spec of how the application could work.

```sh
$ o [items (semicolon-delimited)]
# Place an order of the given items, printing the order number
Your order number: 1

$ l
# List all items currently in the queue, along with their order number
1: Tofu curry laksa
2: Sushi
3: A pizza, with pineapple if you think thats a crime, without it if you think
   it isnt

$ c [order number]
# Mark an order as completed, printing out what kind of food it was
Order number 1: Tofu curry laksa
```
