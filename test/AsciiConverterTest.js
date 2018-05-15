const assert = require('assert');

const TestCase = require('./TestCase');
const AsciiConverter = require('../src/Converter/AsciiConverter');
const NotGeezArgumentException = require('../src/Exception/NotGeezArgumentException');

asciiConverter = new AsciiConverter();

describe('AsciiConverterTest', function () {

    describe('#test_ascii_converter()', function () {
        it('should convert geez number to ascii', function () {
            TestCase.geezNumberTestDataProvider().forEach(([$ascii, $geez]) => {
                $result = asciiConverter.convert($geez);
                assert.equal($ascii, $result);
            });
        });
    });

    describe('#test_invalid_number_throw_exception()', function () {
        it('should throws NotGeezArgumentException', function () {
            TestCase.invalidNumberDataProvider().forEach(($value) => {
                assert.throws(() => {
                    asciiConverter.convert($value)
                }, NotGeezArgumentException);
            });
        });
    });

});
