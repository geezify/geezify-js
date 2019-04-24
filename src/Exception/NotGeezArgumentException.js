/**
 * Class NotGeezArgumentException.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class NotGeezArgumentException extends Error {
  constructor($argument) {
    super(`Not a geez number!, ${$argument} given.`);
  }
};
