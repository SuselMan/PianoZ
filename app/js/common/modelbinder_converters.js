define(function (require) {
	"use strict";


	var Converters = {
		CB: function (direction, value) {
			if (direction === 'ModelToView') {
				return parseInt(value, 10) ? true : false;
			} else {
				return value ? true : false;
			}
		},

		TRIM: function (direction, value) {
				var $ = require('jquery');
				return $.trim(value);
		}
	};

	return Converters;
});
