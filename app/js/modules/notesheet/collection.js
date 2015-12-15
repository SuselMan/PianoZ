define(function(require) {
    "use strict";

    var Marionette = require('marionette');
    var Model = require('./model');

    var Collection = Backbone.Collection.extend({model: Model});

    return Collection;
});
