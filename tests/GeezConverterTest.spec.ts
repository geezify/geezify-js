import assert from "assert";

import TestCase from "./TestCase.spec";
import GeezConverter from "../src/Converters/GeezConverter";
import NotAnIntegerException from "../src/Exceptions/NotAnIntegerException";

/* global describe, it */

describe("GeezConverterTest", () => {
  describe("#test_geez_converter()", () => {
    it("should convert ascii number to geez", () => {
      TestCase.geezNumberTestDataProvider().forEach(
        ([$number, $geez_number]) => {
          const $result = GeezConverter.convert($number as number);
          assert.equal($geez_number, $result);
        }
      );
    });
  });

  describe("#test_invalid_number_throw_exception()", () => {
    it("should throws NotAnIntegerArgumentException", () => {
      TestCase.invalidNumberDataProvider().forEach(($number: any) => {
        assert.throws(() => {
          GeezConverter.convert($number);
        }, NotAnIntegerException);
      });
    });
  });
});
