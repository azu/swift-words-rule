// LICENSE : MIT
"use strict";

var assert = require("power-assert");
var rule = require("../swift-words");
var textlint = require("textlint").textlint;
describe("swift-words-test", function () {
    beforeEach(function () {
        textlint.setupRules({
            "swift-words": rule
        });
    });
    afterEach(function () {
        textlint.resetRules();
    });
    context("when fail.md", function () {
        it("should have error messages", function () {
            var result = textlint.lintFile(__dirname + "/fixtures/fail.md");
            assert(result.messages.length > 0);
        });
    });
    context("when pass.md", function () {
        it("should have not error messages", function () {
            var result = textlint.lintFile(__dirname + "/fixtures/pass.md");
            assert(result.messages.length == 0);
        });
    });
});