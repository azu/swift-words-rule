// LICENSE : MIT
"use strict";
// 訳語 : 原語
var dict = require("./swift-words.json");
var Helper = require("textlint-rule-helper").RuleHelper;
/**
 *
 * @param {RuleContext} context
 */
module.exports = function (context) {
    var helper = new Helper(context);
    var rule = {};
    var Syntax = context.Syntax;
    var translatedWords = Object.keys(dict);
    var matchWords = translatedWords.map(function (key) {
        return dict[key];
    });
    var matchRegexp = matchWords.map(function (word) {
        return new RegExp((word), "i");
    });
    rule[context.Syntax.Str] = function (node) {
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
            return;
        }
        var text = context.getSource(node);
        matchRegexp.forEach(function (WordRegexp, index) {
            var match = text.match(WordRegexp);
            if (match) {
                var matchedString = match[0];
                var expectedWord = translatedWords[index];
                context.report(node, new context.RuleError(matchedString + " => " + expectedWord));
            }
        });
    };
    return rule;
};