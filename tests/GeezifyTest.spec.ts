import assert from "assert";
import sinon from "sinon";

import { toAscii, toGeez } from "../src/geezify";
import GeezConverter from "../src/Converters/GeezConverter";
import AsciiConverter from "../src/Converters/AsciiConverter";
/* global describe, it */

describe("GeezifyTest", () => {
  describe("#test_random_numbers()", () => {
    it("should convert random ascii number to geez and back to the original", () => {
      for (let $i = 0; $i < 10000; $i += 1) {
        const $random_number = Math.floor(Math.random() * 9999999999);

        const $geez_number = toGeez($random_number);
        const $ascii_number = toAscii($geez_number);

        assert.equal($random_number, $ascii_number);
      }
    });
  });

  // Skipped this test case
  // Because, We wont be initializing a new class

  /*
  describe("#test_geezify_build_process()", () => {
    it("should use provided ascii and geez number converters", () => {
      const $geez = new GeezConverter();
      const $ascii = new AsciiConverter();

      sinon.stub($geez, "convert").withArgs(123).returns("giber gaber");
      sinon.stub($ascii, "convert").withArgs("lorem ipsum").returns(321);

      // assert the response
      assert.equal(321, toAscii("lorem ipsum"));
      assert.equal("giber gaber", toGeez(123));
    });
  }); 

   describe("#test_setter_and_getters()", () => {
    it("should be able to substitute implementations", () => {
      const $geezify = Geezify.create();

      const $geez_dummy = sinon.createStubInstance(GeezConverter);
      const $ascii_dummy = sinon.createStubInstance(AsciiConverter);

      $geezify.setGeezConverter($geez_dummy);
      $geezify.setAsciiConverter($ascii_dummy);

      assert.equal($geez_dummy, $geezify.getGeezConverter());
      assert.equal($ascii_dummy, $geezify.getAsciiConverter());
    });
  }); 
  */
});
