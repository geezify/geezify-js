const Converter = require('../Converter/Converter');
const NotGeezArgumentException = require('../Exception/NotGeezArgumentException');

/**
 * GeezParser parse the geez number to a queue.
 */
module.exports = class GeezParser {
    /**
     * GeezParser constructor.
     *
     * @param $geez_number
     *
     * @throws NotGeezArgumentException
     */
    constructor($geez_number) {
        this.setGeezNumber($geez_number);
        this.parsed = null;
    }

    /**
     * @param $geez_number
     *
     * @throws NotGeezArgumentException
     */
    setGeezNumber($geez_number) {
        if (typeof $geez_number !== typeof 'something') {
            throw new NotGeezArgumentException(typeof $geez_number);
        }

        this.geez_number = $geez_number;
    }

    getParsed() {
        return this.parsed;
    }

    /**
     * Swing the magic wand and say the spell.
     */
    parse() {
        this.parsed = [];

        let $block = 0;

        let $length = this.getLength(this.geez_number);

        for (let $index = 0; $index < $length; $index++) {
            $block = this.parseCharacter($index, $block);
        }

        this.pushToQueue($block, 1);
    }

    /**
     * Get the length of the string.
     *
     * @param $geez_number
     *
     * @return int
     */
    getLength($geez_number) {
        return $geez_number.length;
    }

    /**
     * Parse a geez character.
     *
     * @param $index integer
     * @param $block integer
     *
     * @throws \Geezify\Exception\NotGeezArgumentException
     */
    parseCharacter($index, $block) {
        let $ascii_number = this.parseGeezAtIndex($index);

        if (this.isNotGeezSeparator($ascii_number)) {
            $block += $ascii_number;
        } else {
            this.pushToQueue($block, $ascii_number);
            $block = 0;
        }

        return $block;
    }

    /**
     * Get the ascii number from geez number string.
     *
     * @param $index
     *
     * @throws \Geezify\Exception\NotGeezArgumentException
     *
     * @return int
     */
    parseGeezAtIndex($index) {
        let $geez_char = this.getCharacterAt(this.geez_number, $index);

        return parseInt(this.getAsciiNumber($geez_char));
    }

    /**
     * Fetch z character at $index from the geez number string.
     *
     * @param $geez_number
     * @param $index
     *
     * @return string
     */
    getCharacterAt($geez_number, $index) {
        return $geez_number.charAt($index);
    }

    /**
     * Convert geez number character to ascii.
     *
     * @param $geez_number
     *
     * @throws NotGeezArgumentException
     *
     * @return int
     */
    getAsciiNumber($geez_number) {
        let $ascii_number = Object.values(Converter.GEEZ_NUMBERS).indexOf($geez_number);

        if ($ascii_number === -1) {
            throw new NotGeezArgumentException($geez_number);
        }

        return Object.keys(Converter.GEEZ_NUMBERS)[$ascii_number];
    }

    /**
     * @param $ascii_number
     *
     * @return bool
     */
    isNotGeezSeparator($ascii_number) {
        return $ascii_number < 99;
    }

    /**
     * Push to the queue.
     *
     * @param $block
     * @param $separator
     */
    pushToQueue($block, $separator) {
        this.parsed.push(
            {block: $block, separator: $separator}
        );
    }
};
