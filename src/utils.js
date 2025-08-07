/**
 * Utility functions for console messages
 */
const { gray, symbols } = require("ansi-colors");
const { setLenByZero } = require("@el-zazo/main-utils");

/**
 * Creates a formatted message header with pointer and message number
 * @param {number} messageNumber - The current message number
 * @returns {string} Formatted header string
 */
const createMessageHeader = (messageNumber) => {
  try {
    return gray(`${symbols.pointer} ${setLenByZero(messageNumber, 5)} |`);
  } catch (error) {
    console.error("Error creating message header:", error);
    return gray(`> ${messageNumber.toString().padStart(5, "0")} |`);
  }
};

/**
 * Processes message items into formatted lines for display
 * @param {Array} messages - Array of message items to process
 * @returns {Array} Array of processed message lines
 */
const processMessageLines = (messages) => {
  try {
    // Prepare lines | list of lists | every list is a line in the display
    let lines = messages.reduce((res, item) => {
      if (typeof item !== "object" && /\n/gi.test(String(item))) {
        // - String With "\n"

        // All Texts
        const all = String(item).split("\n");
        const [first, others] = [all[0], all.slice(1)];

        // Add First in Last Line | If No Line Exists Set It In New Line
        res.length === 0 ? res.push([first]) : res[res.length - 1].push(first);

        // Add Others Every One In New Line
        res.push(...others.map((other) => [other]));
      } else {
        // - Object (or) String Without "\n"

        // Add Item in Last Line | If No Line Exists Set It In New Line
        res.length === 0 ? res.push([item]) : res[res.length - 1].push(item);
      }

      return res;
    }, []);

    // Delete All Empty Texts
    lines = lines.map((line) => {
      return line.filter((item) => {
        const is_object = typeof item === "object";
        const is_string_not_empty = typeof item !== "object" && String(item).trim().length > 0;

        return is_object || is_string_not_empty;
      });
    });

    return lines;
  } catch (error) {
    console.error("Error processing message lines:", error);
    return [["Error processing message"]];
  }
};

module.exports = {
  createMessageHeader,
  processMessageLines,
};
