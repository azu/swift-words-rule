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
    rule[context.Syntax.Str] = function (node) {
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
            return;
        }
        var text = context.getSource(node);
        matchWords.forEach(function (word) {
            if(text.indexOf(word) > -1) {
                var expectedWord = translatedWords[matchWords.indexOf(word)];
                context.report(node, new context.RuleError(word + " => " + expectedWord));
            }
        });
    };
    return rule;
};