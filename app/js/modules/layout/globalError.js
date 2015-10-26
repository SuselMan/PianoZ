/**
 * Created by glider on 13.05.15.
 */

define(function(require) {
	"use strict";

	var Marionette = require('marionette');

	return Marionette.ItemView.extend({
		template: require('hbs!templates/layout/errorView'),

		serializeData: function() {
			return this.options;
		}
	});
});

