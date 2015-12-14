define(function(require) {
    "use strict";

    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({

        defaults: function() {
            return {
                title: "",
                notesheet: ""
            };
        }
    });

    return Model;

});
