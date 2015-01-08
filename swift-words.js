// LICENSE : MIT
"use strict";
// 訳語 : 原語
var dict = require("./swift-words.json");


/**
 * Get parents of node.
 * The parent nodes are returned in order from the closest parent to the outer ones.
 * @param node
 * @returns {Array}
 */
function getParents(node) {
    var result = [];
    var parent = node.parent;
    while (parent != null) {
        result.push(parent);
        parent = parent.parent;
    }
    return result;
}
/**
 * Return true if `node` is wrapped any one of `types`.
 * @param {TxtNode} node is target node
 * @param {string[]} types are wrapped target node
 * @returns {boolean}
 */
function isNodeWrapped(node, types) {
    var parents = getParents(node);
    var parentsTypes = parents.map(function (parent) {
        return parent.type;
    });
    return types.some(function (type) {
        return parentsTypes.some(function (parentType) {
            return parentType === type;
        });
    });
}
/**
 *
 * @param {RuleContext} context
 */
module.exports = function (context) {
    var rule = {};
    var Syntax = context.Syntax;
    var translatedWords = Object.keys(dict);
    var matchWords = translatedWords.map(function (key) {
        return dict[key];
    });
    rule[context.Syntax.Str] = function (node) {
        if (isNodeWrapped(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
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