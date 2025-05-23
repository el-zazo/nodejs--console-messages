const { red, yellow, green, gray, bold, symbols: { cross, check, pointer } } = require("ansi-colors"); // prettier-ignore
const { setLenByZero } = require("@elzazo/main-js-utils");

/**
 * ## Display Messages in Console By Color
 */
class ConsoleMessages {
  #TYPES = { ERROR: "error", WARNING: "warning", SUCCES: "succes", NORMAL: "normal" };

  // Number Messages Container
  #numMsg = 1;

  // Color And Icon For Every Type
  #types = {
    [this.#TYPES.ERROR]: { color: red.bold, icon: red.bold(cross) },
    [this.#TYPES.WARNING]: { color: yellow.bold, icon: yellow.bold(cross) },
    [this.#TYPES.SUCCES]: { color: green.bold, icon: green.bold(check) },
  };

  /**
   * ### Get Message Header
   */
  #Header = () => gray(`${pointer} ${setLenByZero(this.#numMsg++, 5)} |`);

  /**
   * ### Display Message By Type
   */
  #Message(type, ...messages) {
    const { color = bold, icon = "" } = this.#types[type] ? this.#types[type] : {};

    // Prepare Lignes | list of lists | every list is an ligne in the display
    let lignes = messages.reduce((res, item) => {
      if (typeof item !== "object" && /\n/gi.test(String(item))) {
        // - String With "\n"

        // All Texts
        const all = String(item).split("\n");
        const [first, others] = [all[0], all.slice(1)];

        // Add First in Last Ligne | If No Ligne Exists Set He In New Ligne
        res.length === 0 ? res.push([first]) : res[res.length - 1].push(first);

        // Add Others Every One In New Ligne
        res.push(...others.map((other) => [other]));
      } else {
        // - Object (or) String Without "\n"

        // Add Item in Last Ligne | If No Ligne Exists Set He In New Ligne
        res.length === 0 ? res.push([item]) : res[res.length - 1].push(item);
      }

      return res;
    }, []);

    // Delete All Empty Texts
    lignes = lignes.map((ligne) => {
      return ligne.filter((item) => {
        const is_object = typeof item === "object";
        const is_string_not_empty = typeof item !== "object" && String(item).trim().length > 0;

        return is_object || is_string_not_empty;
      });
    });

    // Set Color To Texts
    lignes = lignes.map((ligne) => {
      return ligne.map((item) => {
        if (typeof item === "object") return item;
        else return color(item);
      });
    });

    // Display
    lignes.map((ligne) => console.log(this.#Header(), ...ligne, ligne.length > 0 ? icon : ""));
  }

  /**
   * ### Error Message
   */
  error(...messages) {
    this.#Message(this.#TYPES.ERROR, ...messages);
  }

  /**
   * ### Warning Message
   */
  warning(...messages) {
    this.#Message(this.#TYPES.WARNING, ...messages);
  }

  /**
   * ### Successful Message
   */
  succes(...messages) {
    this.#Message(this.#TYPES.SUCCES, ...messages);
  }

  /**
   * ### Normal Message
   */
  normal(...messages) {
    this.#Message(this.#TYPES.NORMAL, ...messages);
  }
}

module.exports = { ConsoleMessages };
