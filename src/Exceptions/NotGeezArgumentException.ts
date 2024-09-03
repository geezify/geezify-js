/**
 * Class NotGeezArgumentException.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
export default class NotGeezArgumentException extends Error {
  constructor(argument: any) {
    super(`Not a geez number!, ${argument} given.`);
  }
}
