'use strict';
var validator = require('validator');
var _ = require('lodash');
var WillowError = require('willow-error');

module.exports = function(obj, context) {
	if(!_.isObject(obj)) {
		return new WillowError(
			'willow-context expects an object',
			400,
			'BADARG'
		);
	}
	if(!context) {
		return new WillowError(
			'A context is require ("client" or "server" or "both")',
			400,
			'NOCONTEXT'
		);
	}

	if(!_.isString(context)) {
		return new WillowError(
			'Context must be a string',
			400,
			'BADCONTEXT'
		);
	}

	context = context.toLowerCase();

	if(!validator.isIn(context, ['client', 'server', 'both'])) {
		return new WillowError(
			'Context must be either "client", "server" or "both"',
			400,
			'INVALIDCONTEXT'
		);
	}

	var result = {};

	if(obj.both) {
		for(var i in obj.both) {
			result[i] = obj.both[i];
		}
	}

	if(obj[context]) {
		for(var j in obj[context]) {
			result[j] = obj[context][j];
		}
	}
	return result;
};