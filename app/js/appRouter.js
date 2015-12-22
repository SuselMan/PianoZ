/**
 * Created by Илья on 26.10.15.
 */

define(function(require) {
	"use strict";

	var Marionette = require('marionette');

	var routes = {
		'gameWindow(/)': 'gameWindow',
		'gameWindow(/:id)': 'gameWindow',
		'(/)': 'index'
	};

	return Marionette.AppRouter.extend({
		appRoutes: routes
	});
});
