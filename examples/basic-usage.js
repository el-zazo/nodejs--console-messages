/**
 * Example demonstrating basic usage of the ConsoleMessages module
 */

const { ConsoleMessages, MESSAGE_TYPES } = require("../index");

// Create a new instance of ConsoleMessages
const cm = new ConsoleMessages();

// Display different types of messages
console.log("\n--- Basic Message Examples ---");
cm.error("This is an error message");
cm.warning("This is a warning message");
cm.success("This is a success message");
cm.normal("This is a normal message");

// Display messages with line breaks
console.log("\n--- Messages with Line Breaks ---");
cm.success("First line\nSecond line\n\nFourth line");

// Display messages with multiple arguments
console.log("\n--- Messages with Multiple Arguments ---");
cm.normal("User:", { name: "John", age: 30 }, "Status: Active");

// Display messages with arrays
console.log("\n--- Messages with Arrays ---");
cm.success("Items:", [1, 2, 3, 4], "were processed successfully");

// Error handling example
console.log("\n--- Error Handling Example ---");
try {
  // Simulate an error
  throw new Error("Something went wrong");
} catch (error) {
  cm.error("An error occurred:", error.message);
}
