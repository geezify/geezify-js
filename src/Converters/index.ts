import AsciiConverter from "./AsciiConverter";
import GeezConverter from "./GeezConverter";

/**
 * Convert an ascii number like <b>1, 21, 3456</b> to
 * geez number <b>፩, ፳፩, ፴፬፻፶፮</b>.
 *
 *
 * @throws NotAnIntegerArgumentException if the number is not an integer
 * @return string
 * @param $ascii_number
 */
export const toGeez = (ascii_number: number) => {
  return GeezConverter.convert(ascii_number);
};

/**
 * Accepts geez number and return an integer.
 *
 * @param $geez_number string to be converted
 *
 * @throws NotGeezArgumentException if the valid geez number
 *
 * @return int the ascii representation
 */
export const toAscii = (geez_number: string) => {
  return AsciiConverter.convert(geez_number);
};
