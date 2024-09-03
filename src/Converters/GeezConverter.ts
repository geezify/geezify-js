import Converter from "./Converter";
import AsciiNumber from "../types/AsciiNumber";
import NotAnIntegerException from "../Exceptions/NotAnIntegerException";

export default class GeezConverter extends Converter {
  static convert(num: number): string {
    // Throw NotAnIntegerException if the input number
    // is not a natural number

    if (!num || !this.isPositiveInteger(num)) {
      throw new NotAnIntegerException(num);
    }

    let number = this.prependSpaceIfLengthIsOdd(num.toString());
    let length = number.length;
    let result = "";

    for (let index = 0; index < length; index += 2) {
      let ascii_number: AsciiNumber = {
        value: number,
        index,
        length,
      };
      result += this.parseEachTwoCharactersBlock(ascii_number);
    }

    return result;
  }

  private static parseEachTwoCharactersBlock(
    ascii_number: AsciiNumber
  ): string {
    let geez_number = this.geezNumberOfTheBlock(ascii_number);
    let bet = this.getBet(ascii_number);
    let geez_separator = this.getGeezSeparator(bet);

    return this.combineBlockAndSeparator(
      geez_number,
      geez_separator,
      ascii_number.index
    );
  }

  /**
   * Prepend a space if the length is odd.
   * @return an updated string of number
   */
  private static prependSpaceIfLengthIsOdd(number: string): string {
    if (this.isEven(number.length)) {
      return number;
    }
    let result = " " + number;
    return result;
  }

  private static geezNumberOfTheBlock(ascii_number: AsciiNumber): string {
    let block = this.getBlock(ascii_number);
    const $tenth = this.parseOrDefault(block[0]);
    const $once = this.parseOrDefault(block[1]);

    return Converter.GEEZ_NUMBERS[$tenth * 10] + Converter.GEEZ_NUMBERS[$once];
  }

  private static getBlock(ascii_number: AsciiNumber): string {
    const { value, index } = ascii_number;
    return value.slice(index, index + 2);
  }

  private static parseOrDefault = (
    value: string,
    defaultValue: number = 0
  ): number => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  };

  private static getBet(ascii_number: AsciiNumber): number {
    const reverse_index = ascii_number.length - 1 - ascii_number.index;

    return Math.floor(reverse_index / 2);
  }

  private static getGeezSeparator(bet: number): string {
    if (this.isZero(bet)) {
      return Converter.EMPTY_CHARACTER;
    }

    if (this.isOdd(bet)) {
      return Converter.GEEZ_NUMBERS[100];
    }

    return Converter.GEEZ_NUMBERS[10000];
  }

  /**
   * Combines the block and the separator.
   */
  private static combineBlockAndSeparator(
    geez_number: string,
    separator: string,
    index: number
  ): string {
    if (this.shouldRemoveGeezSeparator(geez_number, separator)) {
      separator = Converter.EMPTY_CHARACTER;
    }

    if (this.shouldRemoveGeezNumberBlock(geez_number, separator, index)) {
      geez_number = Converter.EMPTY_CHARACTER;
    }
    return geez_number + separator;
  }

  /**
   * Returns true if the block is empty and the separator is 100.
   */
  private static shouldRemoveGeezSeparator(block: string, separator: string) {
    return block.trim().length === 0 && this.isGeezNumberHundred(separator);
  }

  /**
   * Returns true if the ascii number is 100 or
   * if the ascii number is the leading 10000.
   */
  private static shouldRemoveGeezNumberBlock(
    $block: string,
    $separator: string,
    $index: number
  ): boolean {
    return (
      this.isOneHundred($block, $separator) ||
      this.isLeadingTenThousand($block, $separator, $index)
    );
  }

  private static isOneHundred(block: string, separator: string): boolean {
    return this.isGeezNumberHundred(separator) && this.isGeezNumberOne(block);
  }

  /**
   * Returns true if the number is the leading 10000.
   */
  private static isLeadingTenThousand(
    block: string,
    separator: string,
    index: number
  ): boolean {
    return (
      this.isZero(index) &&
      this.isGeezNumberOne(block) &&
      this.isGeezNumberTenThousand(separator)
    );
  }
}
