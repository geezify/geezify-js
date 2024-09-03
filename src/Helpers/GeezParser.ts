import Converter from "../Converters/Converter";
import NotGeezArgumentException from "../Exceptions/NotGeezArgumentException";
import Queue from "../types/Queue";

export default class GeezParser {
  private geez_number = "";
  private parsed: Array<Queue> = [];

  /**
   * GeezParser constructor.
   * @throws NotGeezArgumentException
   */
  constructor(geez_number: string) {
    this.setGeezNumber(geez_number);
  }

  /**
   * @throws NotGeezArgumentException
   */
  private setGeezNumber(geez_number: string) {
    if (typeof geez_number !== "string") {
      throw new NotGeezArgumentException(typeof geez_number);
    }
    this.geez_number = geez_number;
  }

  public getParsed() {
    return this.parsed;
  }
  public parse() {
    this.parsed = [];

    let block = 0;

    const length = this.geez_number.length;

    for (let index = 0; index < length; index += 1) {
      block = this.parseCharacter(index, block);
    }

    this.pushToQueue(block, 1);
  }

  private parseCharacter(index: number, block: number) {
    let ascii_number = this.getAsciiNumber(this.geez_number.charAt(index));

    if (this.isNotGeezSeparator(ascii_number)) {
      block += ascii_number;
    } else {
      this.pushToQueue(block, ascii_number);
      block = 0;
    }

    return block;
  }

  getAsciiNumber(geez_number: string): number {
    const ascii_number_index = Object.values(Converter.GEEZ_NUMBERS).indexOf(
      geez_number
    );

    if (ascii_number_index === -1) {
      throw new NotGeezArgumentException(geez_number);
    }
    return parseInt(Object.keys(Converter.GEEZ_NUMBERS)[ascii_number_index]);
  }

  isNotGeezSeparator(ascii_number: number): boolean {
    return ascii_number < 99;
  }

  pushToQueue(block: number, separator: number) {
    this.parsed.push({ block: block, separator: separator });
  }
}
