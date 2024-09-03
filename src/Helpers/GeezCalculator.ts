import Queue from "../types/Queue";

const ONE = 1;
const HUNDRED = 100;
const TEN_THOUSAND = 10000;

export default class GeezCalculator {
  private queue: Array<Queue>;
  private total: number;
  private sub_total: number;

  constructor(queue: Array<Queue>) {
    this.queue = queue;
    this.total = 0;
    this.sub_total = 0;
  }

  calculate() {
    this.resetSubTotalToZero();

    this.queue.forEach((token) => {
      this.processToken(token);
    });
  }

  resetSubTotalToZero() {
    this.sub_total = 0;
  }

  processToken(token: Queue) {
    const block = token.block;
    const separator = token.separator;

    this.processBySeparator(block, separator);
  }

  processBySeparator(block: number, separator: number) {
    switch (separator) {
      case ONE:
        this.addToTotal(block);
        break;
      case HUNDRED:
        this.updateSubTotal(block);
        break;
      case TEN_THOUSAND:
      default:
        this.updateTotal(block);
        break;
    }
  }

  /**
   * Add the sub total and the block to total
   * and reset sub total to zero.
   */
  addToTotal(block: number) {
    this.total += this.sub_total + block;
    this.resetSubTotalToZero();
  }

  addToSubTotal(number: number) {
    this.sub_total += number;
  }

  /**
   * Is the leading block?
   */
  isLeading(block: number): boolean {
    return this.isBlockZero(block) && this.isSubtotalZero();
  }

  isBlockZero(block: number) {
    return this.isZero(block);
  }

  isZero(number: number) {
    return number === 0;
  }
  isSubtotalZero(): boolean {
    return this.isZero(this.sub_total);
  }
  isTotalZero() {
    return this.isZero(this.total);
  }

  multiplyTotalBy10k() {
    this.total *= TEN_THOUSAND;
  }
  getCalculated() {
    return this.total;
  }

  updateSubTotal(block: number) {
    /* eslint-disable no-param-reassign */
    if (this.isLeading(block)) {
      block = ONE;
    }

    block *= HUNDRED;
    /* eslint-enable no-param-reassign */

    this.addToSubTotal(block);
  }

  isLeadingTenThousand(block: number) {
    return this.isTotalZero() && this.isLeading(block);
  }

  updateTotal(block: number) {
    if (this.isLeadingTenThousand(block)) {
      // eslint-disable-next-line no-param-reassign
      block = ONE;
    }

    this.addToTotal(block);
    this.multiplyTotalBy10k();
  }
}
