export default class NotAnIntegerException extends Error {
  constructor(value: any) {
    super(`Value "${value}" is not a valid integer.`);
  }
}
