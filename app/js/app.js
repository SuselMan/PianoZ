/**
 * Created by Илья on 26.10.15.
 */

define(function (require) {
	"use strict";

	var Backbone = require('backbone'),
		Marionette = require("marionette"),
		$ = require('jquery'),
		channelGlobal = require('backbone.radio').channel('global'),
		AppErrorView = require('modules/layout/globalError');

	var App = new Marionette.Application();

	App.addRegions({
		regionContent: '#regionPageContent',
		regionPopUp: '#regionPopUp'
	});

	App.addInitializer(function() {
		this.debug = 3;
		this.root = '/';
	});


	App.navigate = function (route, options) {
		$('#loading-indicator').show();
		console.log("test");
		Backbone.history.navigate(route, options || {});

	};

	channelGlobal.reply('navigate', function (route, options) {
		//console.info('channelGlobal app:navigate: ', arguments);
		Backbone.history.navigate(route, options || {});

	});

	channelGlobal.reply('select:nav:item', function (id) {
		var navbar = $('nav ul.nav');
		$('li', navbar).removeClass('active');
		$('li[data-id='+id+']', navbar).addClass('active');
	});

	channelGlobal.reply('error:global', function(options) {
		App.getRegion('regionContent').show(new AppErrorView(options));
	});

	channelGlobal.reply('hide:app:loader', function () {
		$('#loading-indicator').hide();
	});

	channelGlobal.reply('set:body:class', function (id) {
		var moduleClass = 'module-';

		function removeClass(i, classes) {
			var reg = new RegExp('\\s' + moduleClass + '(\\w+)(?:\\s|$)', 'i'),
				ex = reg.exec(classes);

			return ex ? moduleClass + ex[1] : '';
		}

		$('body').removeClass(removeClass).addClass(moduleClass + id);
	});

	App.getCurrentRoute = function () {
		App.log('Get current route', 'App', 3);
		return Backbone.history.fragment;
	};

	App.on('start', function(options) {
		App.request('auth:check');
	});

	App.log = function (message, domain, level) {
		if (App.debug < level) {
			return;
		}
		if (typeof message !== 'string') {
			console.log('Fancy object (' + domain + ')', message);
		} else {
			console.log((domain || false ? '(' + domain + ') ' : '') + message);
		}
	};
	return App;
});
