/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Karl Purkhardt
*/
'use strict';

var ConstDependency = require('webpack/lib/dependencies/ConstDependency');
var NullFactory = require('webpack/lib/NullFactory');

function Constructor(i18n) {
	this.i18n = i18n;
}

Constructor.prototype.apply = function(compiler) {
	var i18n = this.i18n;

	compiler.plugin('compilation', function(compilation) {
		compilation.dependencyFactories.set(ConstDependency, new NullFactory());
		compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
	});

	compiler.parser.plugin('call __', function(expr) {

		if (expr.arguments.length !== 1) {
			this.state.module.errors.push(new Error('i18n.  Invalid number of arguments passed to __().  Expected 1, got ' + expr.arguments.length));
			return false;
		}

		// The token to pass to i18n for l10n
		var token = expr.arguments[0].value;

		// The range of characters to replace with result
		var range = expr.range;

		// Perform the l10n using the i18n object
		var result = JSON.stringify(i18n.__(token));

		// Create, configure and register the const dependency
		var dep = new ConstDependency(result, range);
		dep.loc = expr.loc;
		this.state.current.addDependency(dep);

		return true;
	});

};

module.exports = Constructor;