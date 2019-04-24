const assert = require('assert');

const TestCase = require('./TestCase');
const AsciiConverter = require('../src/Converter/AsciiConverter');
const NotGeezArgumentException = require('../src/Exception/NotGeezArgumentException');

const asciiConverter = new AsciiConverter();

/* global describe, it */

describe('AsciiConverterTest', () => {
  describe('#test_ascii_converter()', () => {
    it('should convert geez number to ascii', () => {
      TestCase.geezNumberTestDataProvider().forEach(([$ascii, $geez]) => {
        const $result = asciiConverter.convert($geez);
        assert.equal($ascii, $result);
      });
    });
  });

  describe('#test_invalid_number_throw_exception()', () => {
    it('should throws NotGeezArgumentException', () => {
      TestCase.invalidNumberDataProvider().forEach(([$value]) => {
        assert.throws(() => {
          asciiConverter.convert($value);
        }, NotGeezArgumentException);
      });
    });
  });
});
