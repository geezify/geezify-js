const Converter = require('./Converter');
const GeezParser = require('../Helper/GeezParser');
const GeezCalculator = require('../Helper/GeezCalculator');

/**
 * AsciiConverter converts geez number like <b>፲፱፻፹፮</b>
 * to equivalent ascii number like <b>1986</b>.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class AsciiConverter extends Converter {
  /**
   * Accepts geez number and return an integer.
   *
   * @param $geez_number string to be converted
   *
   * @throws NotGeezArgumentException if the valid geez number
   *
   * @return int the ascii representation
   */
  convert($geez_number) {
    const $parsed = this.parse($geez_number);

    return this.calculate($parsed);
  }

  /**
   * Parse the geez number number to a queue.
   *
   * @param $geez_number
   *
   * @return Queue
   */
  parse($geez_number) {
    const $parser = new GeezParser($geez_number);
    $parser.parse();

    return $parser.getParsed();
  }

  /**
   * Calculate the ascii from the parsed queue.
   *
   * @param Queue $parsed
   *
   * @return int
   */
  calculate($parsed) {
    const $calculator = new GeezCalculator($parsed);
    $calculator.calculate();

    return $calculator.getCalculated();
  }
};
