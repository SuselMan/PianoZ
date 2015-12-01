/**
 * Created by Илья on 26.10.15.
 */

define(function(require) {
	"use strict";

	var App = require('app');
  var channelGlobal = require('backbone.radio').channel('global');

	var appController = {

		index: function() {
		  channelGlobal.request('navigate', 'gameWindow', {trigger: true, replace: true});
		},

		gameWindow: function(id) {
		  var module = require('modules/gameWindow/module');

		  App.activeModule && App.activeModule.stop();
	    App.activeModule = module;
	    App.activeModule.start({id: id});

	    channelGlobal.request('select:nav:item', 'gameWindow');
	    channelGlobal.request('set:body:class', 'gameWindow');
	    channelGlobal.request('hide:app:loader');
		}
	};

	return appController;
});
