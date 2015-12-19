define(function(require) {
    "use strict";

    var Model = require('./model');

    var Collection = Backbone.Collection.extend({model: Model});

    return Collection;
});
