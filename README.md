# Chef order management system

***My name Shef***

Allows users to input orders and receive an order number, then allows a chef to
read those orders and mark them as fulfilled.

This is an exercise to help COMP1531 students learn integration testing. I
designed it as a replacement for the existing [pretty](../pretty/README.md)
exercise, in order to more strongly reinforce best-practices for integration
testing.

## Solutions

Worked solutions can be found
[on the solution branch](https://github.com/MaddyGuthridge/shef/tree/solution).

I did a different commit for each step of the task, so you can look at the
commit history to see process I went through to complete the work.

## Your task

In order to complete this exercise, you should:

### 0. Understanding the project

There is a simple CLI to interact with the application. Have a play around with
it to understand how the app should work before starting with testing.

```txt
$ o [items (semicolon-delimited)]
# Place an order of the given items, printing the order number
Your order number: 1

$ d [order number]
# Print details about an order
Order 1: Tofu laksa curry, not completed.

$ l
# List all items currently in the queue, along with their order number
1: Tofu curry laksa
2: Sushi
3: A pizza, (with pineapple if you think that's a crime, without it if you
   think it isn't)

$ c [order number]
# Mark an order as completed
Order number 1 completed

$ Ctrl+C
# Cleanly exit the program
```

### 1. Using multiple files

Move the data-store to a separate file, using ESM imports to share code across
multiple files.

### 2. Setup

1. Read the provided function stubs to understand the task

2. Install development dependencies (`npm i -D [package-names]`)

    * `@babel/preset-env` - Provides support for code transpilation so we can
      use the latest and greatest JS features.
    * `jest` - A powerful testing framework we can use to validate our
      implementation.
    * `@types/jest` - Type definitions for Jest, which get us better editor
      support in VS Code.

3. Set up scripts for running the CLI and running our tests by modifying the
   `package.json` file.

### 3. Test-driven development

Technically test-driven development isn't official COMP1531 course content
anymore, but I think it's useful to learn.

1. Write a test list. Use `describe` and `test.todo` to create a structure for
   all the tests we plan on writing.

2. Implement some simple tests

3. Run the tests and observe that they all fail.

4. Write the implementation so that the tests pass

5. Update the tests again so that the implementation fails the tests

6. Update the implementation again to make it pass the tests

7. Repeat steps 5 and 6 until you run out of ideas for tests

8. You're done!
