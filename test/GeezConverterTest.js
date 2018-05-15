const assert = require('assert');

const TestCase = require('./TestCase');
const GeezConverter = require('../src/Converter/GeezConverter');
const NotAnIntegerArgumentException = require('../src/Exception/NotAnIntegerArgumentException');

const geezConverter = new GeezConverter();

describe('GeezConverterTest', function () {

    describe('#test_geez_converter()', function () {
        it('should convert ascii number to geez', function () {
            TestCase.geezNumberTestDataProvider().forEach(([$number, $geez_number]) => {
                $result = geezConverter.convert($number);
                assert.equal($geez_number, $result);
            });
        });
    });

    describe('#test_invalid_number_throw_exception()', function () {
        it('should throws NotAnIntegerArgumentException', function () {
            TestCase.invalidNumberDataProvider().forEach(($number) => {
                assert.throws(() => {
                    geezConverter.convert($number);
                }, NotAnIntegerArgumentException);
            });
        });
    });

});
