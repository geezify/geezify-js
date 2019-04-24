const assert = require('assert');

const TestCase = require('./TestCase');
const GeezConverter = require('../src/Converter/GeezConverter');
const NotAnIntegerArgumentException = require('../src/Exception/NotAnIntegerArgumentException');

const geezConverter = new GeezConverter();

/* global describe, it */

describe('GeezConverterTest', () => {
  describe('#test_geez_converter()', () => {
    it('should convert ascii number to geez', () => {
      TestCase.geezNumberTestDataProvider().forEach(([$number, $geez_number]) => {
        const $result = geezConverter.convert($number);
        assert.equal($geez_number, $result);
      });
    });
  });

  describe('#test_invalid_number_throw_exception()', () => {
    it('should throws NotAnIntegerArgumentException', () => {
      TestCase.invalidNumberDataProvider().forEach(($number) => {
        assert.throws(() => {
          geezConverter.convert($number);
        }, NotAnIntegerArgumentException);
      });
    });
  });
});
