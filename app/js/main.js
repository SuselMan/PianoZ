/**
 * Created by Илья on 26.10.15.
 */
define(function (require) {
	"use strict";

	var Backbone = require('backbone'),
		_ = require('underscore'),
		App = require('app'),
		AppRouter = require('appRouter'),
		appController = require('appController');

	App.addInitializer(function () {
		App.Router = new AppRouter({
			controller: appController
		});
	});

	App.on('start', function() {
		if (Backbone.history){
			Backbone.history.start({pushState: true});
		}
	});

	App.start();

	// All navigation that is relative should be passed through the navigate
	// method, to be processed by the router. If the link has a `data-bypass`
	// attribute, bypass the delegation completely.
	Backbone.$(document).on('click', 'a:not([data-bypass])', function(e) {
		// Get the absolute anchor href.
		var href = {
				prop: Backbone.$(this).prop('href'),
				attr: Backbone.$(this).attr('href')
			},
			root = location.protocol + '//' + location.host + App.root;

		// Ensure the root is part of the anchor href, meaning it's relative.
		if (href.prop && href.prop.slice(0, root.length) === root) {
			e.preventDefault();
			Backbone.history.navigate(href.attr, {trigger: true});
		}
	});

	Backbone.$(document).on('click', 'a[data-bypass]', function(e) {
		e.preventDefault();
	});

	Backbone.$(document).on('mouseup', function (e) {
		var popovers = document.querySelectorAll('.popover');
		if (popovers.length && !Backbone.$(e.target).closest('.popover').length) {
			_.each(popovers, function (el) {
				Backbone.$(el.previousSibling).popover('destroy');
			});
		}
	});

	//Backbone.$("body").tooltip({selector: '[data-toggle=tooltip]'});
});
