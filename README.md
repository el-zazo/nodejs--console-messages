# Console Messages

A Node.js module for displaying formatted and colored console messages.

## Installation

```bash
npm install @el-zazo/console-messages
```

## Features

- Display colored console messages with icons
- Support for different message types: error, warning, success, normal
- Automatic line numbering
- Support for multi-line messages
- Display objects and arrays alongside text
- Comprehensive error handling

## Message Types

- `error` - Red text with error icon
- `warning` - Yellow text with warning icon
- `success` - Green text with check icon
- `normal` - Regular text with no icon

## Basic Usage

```js
const { ConsoleMessages } = require("@el-zazo/console-messages");

// Create a new instance
const cm = new ConsoleMessages();

// Display different types of messages
cm.error("This is an error message");
cm.warning("This is a warning message");
cm.success("This is a success message");
cm.normal("This is a normal message");
```

## Multi-line Messages

Use `\n` in text to create new lines, each with its own pointer and line number:

```js
const cm = new ConsoleMessages();
cm.success("First line\nSecond line\n\nFourth line");
```

Output:

```
> 00001 | First line ✓
> 00002 | Second line ✓
> 00003 | ✓
> 00004 | Fourth line ✓
```

## Multiple Arguments

You can pass multiple arguments to display them together:

```js
const cm = new ConsoleMessages();
cm.normal("User:", { name: "John", age: 30 }, "Status: Active");
cm.success("Items:", [1, 2, 3, 4], "were processed successfully");
```

Output:

```
> 00001 | User: { name: 'John', age: 30 } Status: Active
> 00002 | Items: [ 1, 2, 3, 4 ] were processed successfully ✓
```

## Project Structure

```
/
├── src/
│   ├── ConsoleMessages.js  - Main class implementation
│   ├── constants.js        - Constants and message types
│   └── utils.js            - Utility functions
├── examples/
│   └── basic-usage.js      - Usage examples
├── index.js                - Main entry point
└── README.md               - Documentation
```

## Running Examples

To run the included examples:

```bash
node examples/basic-usage.js
```

## License

ISC
