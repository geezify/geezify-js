// i don't want readers to think it's a white
// space, it's just an empty string
const EMPTY_CHARACTER = '';

const GEEZ_NUMBERS = {
    0: '',
    1: '፩',
    2: '፪',
    3: '፫',
    4: '፬',
    5: '፭',
    6: '፮',
    7: '፯',
    8: '፰',
    9: '፱',
    10: '፲',
    20: '፳',
    30: '፴',
    40: '፵',
    50: '፶',
    60: '፷',
    70: '፸',
    80: '፹',
    90: '፺',
    100: '፻',
    10000: '፼'
};

/**
 * Converter class provide the base functionality
 * for the Ascii and Geez converters.
 *
 * @author Sam As End <4sam21{at}gmail.com>
 */
module.exports = class Converter {

    /**
     * Check if a number is strictly ZERO.
     *
     * @return boolean if true it's zero
     * @param $number
     */
    isZero($number) {
        return $number === 0;
    }

    /**
     * Checks if the number is ፻.
     *
     * @return bool
     * @param $geez_number
     */
    isGeezNumberHundred($geez_number) {
        return this.isGeezNumber($geez_number, 100);
    }

    /**
     * Checks if the geez number character is equal to ascii number.
     *
     * @return boolean
     * @param $geez_number
     * @param $number
     */
    isGeezNumber($geez_number, $number) {
        return $geez_number === Converter.GEEZ_NUMBERS[$number];
    }

    /**
     * Checks if the number is ፩.
     *
     * @param $geez_number
     * @return bool
     */
    isGeezNumberOne($geez_number) {
        return this.isGeezNumber($geez_number, 1);
    }

    /**
     * Checks if the number is ፼
     *
     * @param $geez_number
     * @return bool
     */
    isGeezNumberTenThousand($geez_number) {
        return this.isGeezNumber($geez_number, 10000);
    }
};

Object.defineProperty(module.exports, 'EMPTY_CHARACTER', {
    value: EMPTY_CHARACTER,
    writable : false,
    enumerable : true,
    configurable : false
});

Object.defineProperty(module.exports, 'GEEZ_NUMBERS', {
    value: GEEZ_NUMBERS,
    writable : false,
    enumerable : true,
    configurable : false
});

// module.exports.EMPTY_CHARACTER = EMPTY_CHARACTER;
// module.exports.GEEZ_NUMBERS = GEEZ_NUMBERS;
