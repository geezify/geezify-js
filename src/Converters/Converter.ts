export default class Converter {
  public static readonly EMPTY_CHARACTER = "";

  public static readonly GEEZ_NUMBERS: any = {
    0: "",
    1: "፩",
    2: "፪",
    3: "፫",
    4: "፬",
    5: "፭",
    6: "፮",
    7: "፯",
    8: "፰",
    9: "፱",
    10: "፲",
    20: "፳",
    30: "፴",
    40: "፵",
    50: "፶",
    60: "፷",
    70: "፸",
    80: "፹",
    90: "፺",
    100: "፻",
    10000: "፼",
  };

  /**
   * Checks if the number is ፻.
   *
   * @return bool
   * @param $geez_number
   */
  protected static isGeezNumberHundred(geez_number: string) {
    return this.isGeezNumber(geez_number, 100);
  }

  /**
   * Checks if the geez number character is equal to ascii number.
   *
   * @return boolean
   * @param $geez_number
   * @param $number
   */
  protected static isGeezNumber(geez_number: string, ascii_number: number) {
    return geez_number === Converter.GEEZ_NUMBERS[ascii_number];
  }

  /**
   * Checks if the number is ፩.
   *
   * @param $geez_number
   * @return bool
   */
  protected static isGeezNumberOne(geez_number: string) {
    return this.isGeezNumber(geez_number, 1);
  }

  /**
   * Checks if the number is ፼
   *
   * @param $geez_number
   * @return bool
   */
  protected static isGeezNumberTenThousand(geez_number: string) {
    return this.isGeezNumber(geez_number, 10000);
  }

  protected static isPositiveInteger(value: number): boolean {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
  }

  protected static isEven(integer: number): boolean {
    return integer % 2 === 0;
  }
  protected static isOdd(integer: number): boolean {
    return integer % 2 !== 0;
  }

  protected static isZero(integer: number): boolean {
    return integer === 0;
  }
}
