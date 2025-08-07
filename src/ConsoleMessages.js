/**
 * ConsoleMessages - A class for displaying formatted and colored console messages
 * @module ConsoleMessages
 */

const { red, yellow, green, bold, symbols } = require("ansi-colors");
const { MESSAGE_TYPES } = require("./constants");
const { createMessageHeader, processMessageLines } = require("./utils");

/**
 * Class for displaying formatted console messages with colors and icons
 * @class
 */
class ConsoleMessages {
  /**
   * Message counter to track the number of messages displayed
   * @private
   */
  #numMsg = 1;

  /**
   * Configuration for different message types with their colors and icons
   * @private
   */
  #types = {
    [MESSAGE_TYPES.ERROR]: { color: red.bold, icon: red.bold(symbols.cross) },
    [MESSAGE_TYPES.WARNING]: { color: yellow.bold, icon: yellow.bold(symbols.cross) },
    [MESSAGE_TYPES.SUCCESS]: { color: green.bold, icon: green.bold(symbols.check) },
  };

  /**
   * Creates a message header with pointer and message number
   * @private
   * @returns {string} Formatted header string
   */
  #Header = () => createMessageHeader(this.#numMsg++);

  /**
   * Displays a message of the specified type
   * @private
   * @param {string} type - The message type (error, warning, success, normal)
   * @param {...any} messages - The message content to display
   */
  #Message(type, ...messages) {
    try {
      if (!messages || messages.length === 0) {
        console.warn("No message content provided");
        return;
      }

      const { color = bold, icon = "" } = this.#types[type] ? this.#types[type] : {};

      // Process messages into lines
      let lines = processMessageLines(messages);

      // Apply color to text items
      lines = lines.map((line) => {
        return line.map((item) => {
          if (typeof item === "object") return item;
          else return color(item);
        });
      });

      // Display each line
      lines.forEach((line) => {
        try {
          console.log(this.#Header(), ...line, line.length > 0 ? icon : "");
        } catch (error) {
          console.error("Error displaying message line:", error);
        }
      });
    } catch (error) {
      console.error("Error in message display:", error);
    }
  }

  /**
   * Displays an error message
   * @param {...any} messages - The message content to display
   */
  error(...messages) {
    this.#Message(MESSAGE_TYPES.ERROR, ...messages);
  }

  /**
   * Displays a warning message
   * @param {...any} messages - The message content to display
   */
  warning(...messages) {
    this.#Message(MESSAGE_TYPES.WARNING, ...messages);
  }

  /**
   * Displays a success message
   * @param {...any} messages - The message content to display
   */
  success(...messages) {
    this.#Message(MESSAGE_TYPES.SUCCESS, ...messages);
  }

  /**
   * Displays a normal message
   * @param {...any} messages - The message content to display
   */
  normal(...messages) {
    this.#Message(MESSAGE_TYPES.NORMAL, ...messages);
  }
}

module.exports = ConsoleMessages;
