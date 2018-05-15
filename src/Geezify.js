const GeezConverter = require('./Converter/GeezConverter');
const AsciiConverter = require('./Converter/AsciiConverter');

/**
 * Geezify converts numbers in ASCII to Geez and vise versa.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class Geezify {
    /**
     * Geezify constructor.
     *
     * @param $geez_converter
     * @param $ascii_converter
     */
    constructor($geez_converter, $ascii_converter) {
        this.geez_converter = $geez_converter;
        this.ascii_converter = $ascii_converter;
    }

    /**
     * Return a new Geezify instance.
     *
     * @return Geezify
     */
    static create() {
        return new Geezify(new GeezConverter(), new AsciiConverter());
    }

    /**
     * Converts ASCII number to geez.
     *
     * @param $ascii_number
     *
     * @throws \Geezify\Exception\NotAnIntegerArgumentException
     *
     * @return string
     */
    toGeez($ascii_number) {
        return this.geez_converter.convert($ascii_number);
    }

    /**
     * Convert geez to ASCII.
     *
     * @param string $geez_number
     *
     * @throws \Geezify\Exception\NotGeezArgumentException
     *
     * @return int
     */
    toAscii($geez_number) {
        return this.ascii_converter.convert($geez_number);
    }

    /**
     * @return GeezConverter
     */
    getGeezConverter() {
        return this.geez_converter;
    }

    /**
     * @param GeezConverter $geez_converter
     */
    setGeezConverter($geez_converter) {
        this.geez_converter = $geez_converter;
    }

    /**
     * @return AsciiConverter
     */
    getAsciiConverter() {
        return this.ascii_converter;
    }

    /**
     * @param AsciiConverter $ascii_converter
     */
    setAsciiConverter($ascii_converter) {
        this.ascii_converter = $ascii_converter;
    }
};
