const Converter = require('../Converter/Converter');

const ONE = 1;
const HUNDRED = 100;
const TEN_THOUSAND = 10000;

/**
 * GeezCalculator calculate the ascii number from the parsed queue.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class GeezCalculator {
    constructor($queue) {
        this.queue = $queue;
        this.total = 0;
        this.sub_total = 0;
    }

    /**
     * Do the magic.
     */
    calculate() {
        this.resetSubTotalToZero();

        this.queue.forEach(($token) => {
            this.processToken($token);
        });
    }

    /**
     * set the sub total attribute to zero.
     */
    resetSubTotalToZero() {
        this.sub_total = 0;
    }

    /**
     * Process a single token from the Queue.
     *
     * @param $token
     */
    processToken($token) {
        let $block = $token['block'];
        let $separator = $token['separator'];

        this.processBySeparator($block, $separator);
    }

    /**
     * Process based on separator.
     *
     * @param $block
     * @param $separator
     */
    processBySeparator($block, $separator) {
        if ($separator === ONE) {
            this.addToTotal($block);
        } else if ($separator === HUNDRED) {
            this.updateSubTotal($block);
        } else if ($separator === TEN_THOUSAND) {
            this.updateTotal($block);
        }
    }

    /**
     * Add the sub total and the block to total
     * and reset sub total to zero.
     *
     * @param $block
     *
     * @return void
     */
    addToTotal($block) {
        this.total += (this.sub_total + $block);
        this.resetSubTotalToZero();
    }

    /**
     * Is the leading block?
     *
     * @param $block
     *
     * @return bool
     */
    isLeading($block) {
        return this.isBlockZero($block) &&
            this.isSubtotalZero();
    }

    /**
     * Is the value of block zero?
     *
     * @param $block
     *
     * @return bool
     */
    isBlockZero($block) {
        return this.isZero($block);
    }

    /**
     * Is a number zero?
     *
     * @param $number
     *
     * @return boolean
     */
    isZero($number) {
        return $number === 0;
    }

    /**
     * Is sub total attribute zero?
     *
     * @return bool
     */
    isSubtotalZero() {
        return this.isZero(this.sub_total);
    }

    /**
     * Add number to sun total.
     *
     * @param $number integer
     */
    addToSubTotal($number) {
        this.sub_total += $number;
    }

    /**
     * Is the leading 10k?
     *
     * @param $block
     *
     * @return bool
     */
    isLeadingTenThousand($block) {
        return this.isTotalZero() &&
            this.isLeading($block);
    }

    /**
     * Is the total attribute zero?
     *
     * @return bool
     */
    isTotalZero() {
        return this.isZero(this.total);
    }

    /**
     * Multiply the total attribute by ten thousand.
     */
    multiplyTotalBy10k() {
        this.total *= TEN_THOUSAND;
    }

    /**
     * Return the calculated ascii number.
     *
     * @return int
     */
    getCalculated() {
        return this.total;
    }

    /**
     * Update the sub total attribute.
     *
     * @param $block
     */
    updateSubTotal($block) {
        if (this.isLeading($block)) {
            $block = ONE;
        }

        $block *= HUNDRED;

        this.addToSubTotal($block);
    }

    /**
     * Update the sub total attribute.
     *
     * @param $block
     */
    updateTotal($block) {
        if (this.isLeadingTenThousand($block)) {
            $block = ONE;
        }

        this.addToTotal($block);
        this.multiplyTotalBy10k();
    }
};
