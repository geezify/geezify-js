/**
 * Class NotAnIntegerArgumentException.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class NotAnIntegerArgumentException extends Error {
  constructor($argument) {
    super(`Not an integer!, ${typeof $argument} given.`);
  }
};
