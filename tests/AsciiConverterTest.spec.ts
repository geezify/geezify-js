import assert from "assert";

import TestCase from "./TestCase.spec";
import AsciiConverter from "../src/Converters/AsciiConverter";
import NotGeezArgumentException from "../src/Exceptions/NotGeezArgumentException";

/* global describe, it */

describe("AsciiConverterTest", () => {
  describe("#test_ascii_converter()", () => {
    it("should convert geez number to ascii", () => {
      TestCase.geezNumberTestDataProvider().forEach(([$ascii, $geez]) => {
        const $result = AsciiConverter.convert($geez as string);
        assert.equal($ascii, $result);
      });
    });
  });

  describe("#test_invalid_number_throw_exception()", () => {
    it("should throws NotGeezArgumentException", () => {
      TestCase.invalidNumberDataProvider().forEach(([$value]) => {
        assert.throws(() => {
          AsciiConverter.convert($value as string);
        }, NotGeezArgumentException);
      });
    });
  });
});
