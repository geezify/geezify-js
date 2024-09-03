import Converter from "./Converter";
import GeezParser from "../Helpers/GeezParser";
import GeezCalculator from "../Helpers/GeezCalculator";
import Queue from "../types/Queue";

export default class AsciiConverter extends Converter {
  public static convert(geez_number: string) {
    const $parsed = this.parse(geez_number);
    return this.calculate($parsed);
  }

  /**
   * @return Queue
   */
  private static parse(geez_number: string): Array<Queue> {
    const $parser = new GeezParser(geez_number);
    $parser.parse();

    return $parser.getParsed();
  }

  /**
   * Calculate the ascii from the parsed queue.
   */
  private static calculate(parsed: Array<Queue>) {
    const calculator = new GeezCalculator(parsed);
    calculator.calculate();

    return calculator.getCalculated();
  }
}
