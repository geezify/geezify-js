const assert = require('assert');

const sinon = require('sinon');

const Geezify = require('../src/Geezify');
const GeezConverter = require('../src/Converter/GeezConverter');
const AsciiConverter = require('../src/Converter/AsciiConverter');

describe('GeezifyTest', function () {

    describe('#test_random_numbers()', function () {
        it('should convert random ascii number to geez and back to the original', function () {
            let $geezify = Geezify.create();

            for (let $i = 0; $i < 10000; $i++) {
                let $random_number = Math.floor(Math.random() * 9999999999);

                let $geez_number = $geezify.toGeez($random_number);
                let $ascii_number = $geezify.toAscii($geez_number);

                assert.equal($random_number, $ascii_number);
            }
        });
    });

    describe('#test_geezify_build_process()', function () {
        it('should use provided ascii and geez number converters', function () {
            let $geez = new GeezConverter();
            let $ascii = new AsciiConverter();

            sinon.stub($geez, 'convert').withArgs(123).returns('giber gaber');
            sinon.stub($ascii, 'convert').withArgs('lorem ipsum').returns(321);

            let $geezify = new Geezify($geez, $ascii);

            // assert the response
            assert.equal(321, $geezify.toAscii('lorem ipsum'));
            assert.equal('giber gaber', $geezify.toGeez(123));
        });
    });

    describe('#test_setter_and_getters()', function () {
        it('should be able to substitute implementations', function () {
            let $geezify = Geezify.create();

            let $geez_dummy = sinon.createStubInstance(GeezConverter);
            let $ascii_dummy = sinon.createStubInstance(AsciiConverter);

            $geezify.setGeezConverter($geez_dummy);
            $geezify.setAsciiConverter($ascii_dummy);

            assert.equal($geez_dummy, $geezify.getGeezConverter());
            assert.equal($ascii_dummy, $geezify.getAsciiConverter());
        });
    });

});
