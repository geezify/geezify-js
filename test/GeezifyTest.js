const assert = require('assert');

const sinon = require('sinon');

const Geezify = require('../src/Geezify');
const GeezConverter = require('../src/Converter/GeezConverter');
const AsciiConverter = require('../src/Converter/AsciiConverter');

/* global describe, it */

describe('GeezifyTest', () => {
  describe('#test_random_numbers()', () => {
    it('should convert random ascii number to geez and back to the original', () => {
      const $geezify = Geezify.create();

      for (let $i = 0; $i < 10000; $i += 1) {
        const $random_number = Math.floor(Math.random() * 9999999999);

        const $geez_number = $geezify.toGeez($random_number);
        const $ascii_number = $geezify.toAscii($geez_number);

        assert.equal($random_number, $ascii_number);
      }
    });
  });

  describe('#test_geezify_build_process()', () => {
    it('should use provided ascii and geez number converters', () => {
      const $geez = new GeezConverter();
      const $ascii = new AsciiConverter();

      sinon
        .stub($geez, 'convert')
        .withArgs(123)
        .returns('giber gaber');
      sinon
        .stub($ascii, 'convert')
        .withArgs('lorem ipsum')
        .returns(321);

      const $geezify = new Geezify($geez, $ascii);

      // assert the response
      assert.equal(321, $geezify.toAscii('lorem ipsum'));
      assert.equal('giber gaber', $geezify.toGeez(123));
    });
  });

  describe('#test_setter_and_getters()', () => {
    it('should be able to substitute implementations', () => {
      const $geezify = Geezify.create();

      const $geez_dummy = sinon.createStubInstance(GeezConverter);
      const $ascii_dummy = sinon.createStubInstance(AsciiConverter);

      $geezify.setGeezConverter($geez_dummy);
      $geezify.setAsciiConverter($ascii_dummy);

      assert.equal($geez_dummy, $geezify.getGeezConverter());
      assert.equal($ascii_dummy, $geezify.getAsciiConverter());
    });
  });
});
