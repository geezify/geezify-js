const Converter = require('./Converter');
const NotAnIntegerArgumentException = require('../Exception/NotAnIntegerArgumentException');

/**
 * GeezConverter converts ascii number like <b>1986</b>
 * to equivalent geez number like <b>፲፱፻፹፮</b>.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class GeezConverter extends Converter {
  /**
   * Convert an ascii number like <b>1, 21, 3456</b> to
   * geez number <b>፩, ፳፩, ፴፬፻፶፮</b>.
   *
   *
   * @throws NotAnIntegerArgumentException if the number is not an integer
   * @return string
   * @param $ascii_number
   */
  convert($ascii_number) {
    const $number = this.prepareForConversion($ascii_number);
    const $length = $number.length;
    let $result = Converter.EMPTY_CHARACTER;

    for (let $index = 0; $index < $length; $index += 2) {
      $result += this.parseEachTwoCharactersBlock($number, $index, $length);
    }

    return $result;
  }

  /**
   * - Validate the number
   * - Convert the number to a string
   * - Get the length of the number
   * - Prepend a space if the length is odd.
   *
   * @param $ascii_number
   *
   * @throws \Geezify\Exception\NotAnIntegerArgumentException
   *
   * @return array the $number and the $length
   */
  prepareForConversion($ascii_number) {
    let $validated_number = this.validateAsciiNumber($ascii_number);

    $validated_number = `${$validated_number}`;

    const $length = $validated_number.length;

    const $number = this.prependSpaceIfLengthIsEven($validated_number, $length);

    return $number;
  }

  /**
   * Validate if the number is ascii number.
   *
   * @param $ascii_number
   *
   * @throws NotAnIntegerArgumentException
   * @return int
   */
  validateAsciiNumber($ascii_number) {
    const number = parseInt($ascii_number, 10);

    if (Number.isNaN(number) || `${number}` !== `${$ascii_number}` || number < 1) {
      throw new NotAnIntegerArgumentException($ascii_number);
    }

    return $ascii_number;
  }

  /**
   * Prepend space if the length of the number is odd.
   *
   * @param $ascii_number
   * @param $length
   *
   * @return string
   */
  prependSpaceIfLengthIsEven($ascii_number, $length) {
    if (this.isOdd($length)) {
      return ` ${$ascii_number}`;
    }

    return $ascii_number;
  }

  /**
   * Is a number odd?
   *
   * @param $ascii_number
   *
   * @return bool
   */
  isOdd($ascii_number) {
    return !this.isEven($ascii_number);
  }

  /**
   * Is a number even?
   *
   * @param $number
   *
   * @return boolean
   */
  isEven($number) {
    return $number % 2 === 0;
  }

  /**
   * Parse each two character block.
   *
   * @param $number
   * @param $index
   * @param $length
   *
   * @return string
   */
  parseEachTwoCharactersBlock($number, $index, $length) {
    const $geez_number = this.getGeezNumberOfTheBlock($number, $index);

    const $bet = this.getBet($length, $index);

    const $geez_separator = this.getGeezSeparator($bet);

    return this.combineBlockAndSeparator($geez_number, $geez_separator, $index);
  }

  /**
   * Fetch the two character (00-99) block and convert it to geez.
   *
   * @param $number
   * @param $index
   *
   * @return string geez two character block
   */
  getGeezNumberOfTheBlock($number, $index) {
    const $block = this.getBlock($number, $index);

    const $tenth = Number.isNaN(parseInt($block[0], 10)) ? 0 : parseInt($block[0], 10);
    const $once = parseInt($block[1], 10);

    return Converter.GEEZ_NUMBERS[$tenth * 10] + Converter.GEEZ_NUMBERS[$once];
  }

  /**
   * Fetch two characters from the $number starting from $index.
   *
   * @param $number string the whole ascii number
   * @param $index  integer the starting position
   *
   * @return string
   */
  getBlock($number, $index) {
    return $number.substr($index, 2);
  }

  /**
   * The ቤት of the block.
   *
   * @param $length integer the length of the ascii number
   * @param $index  integer the character index
   *
   * @return int
   */
  getBet($length, $index) {
    const $reverse_index = $length - 1 - $index;

    return Math.floor($reverse_index / 2);
  }

  /**
   * Get the separator depending on the bet.
   *
   * @param $bet
   *
   * @return string return ፻,፼ or empty character
   */
  getGeezSeparator($bet) {
    if (this.isZero($bet)) {
      return Converter.EMPTY_CHARACTER;
    }
    if (this.isOdd($bet)) {
      return Converter.GEEZ_NUMBERS[100];
    }

    return Converter.GEEZ_NUMBERS[10000];
  }

  /**
   * Combines the block and the separator.
   *
   *
   * @return string
   * @param $geez_number
   * @param $separator
   * @param $index
   */
  combineBlockAndSeparator($geez_number, $separator, $index) {
    /* eslint-disable no-param-reassign */
    if (this.shouldRemoveGeezSeparator($geez_number, $separator)) {
      $separator = Converter.EMPTY_CHARACTER;
    }

    if (this.shouldRemoveGeezNumberBlock($geez_number, $separator, $index)) {
      $geez_number = Converter.EMPTY_CHARACTER;
    }
    /* eslint-enable no-param-reassign */

    return $geez_number + $separator;
  }

  /**
   * Returns true if the block is empty and the separator is 100.
   *
   * @return bool
   * @param $block
   * @param $separator
   */
  shouldRemoveGeezSeparator($block, $separator) {
    return $block.trim().length === 0 && this.isGeezNumberHundred($separator);
  }

  /**
   * Returns true if the ascii number is 100 or
   * if the ascii number is the leading 10000.
   *
   * @param $block
   * @param $separator
   * @param $index
   *
   * @return bool
   */
  shouldRemoveGeezNumberBlock($block, $separator, $index) {
    return (
      this.isOneHundred($block, $separator) || this.isLeadingTenThousand($block, $separator, $index)
    );
  }

  /**
   * Returns true if the number is 100.
   *
   * @param $block
   * @param $separator
   *
   * @return bool
   */
  isOneHundred($block, $separator) {
    return this.isGeezNumberHundred($separator) && this.isGeezNumberOne($block);
  }

  /**
   * Returns true if the number is the leading 10000.
   *
   * @param $block
   * @param $separator
   * @param $index
   *
   * @return bool
   */
  isLeadingTenThousand($block, $separator, $index) {
    return (
      this.isZero($index)
      && this.isGeezNumberOne($block)
      && this.isGeezNumberTenThousand($separator)
    );
  }
};
