define(function(require) {
    "use strict";

    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({

        defaults: function() {
            return {
                title: "Sample abc-js notesheet",
                notesheet: "X:1\n" +
                           "T:Notes\n" +
                           "M:C\n" +
                           "L:1/4\n" +
                           "K:C\n" +
                           "C, D, E, F,|G, A, B, C|D E F G|A B c d|e f g a|b c' d' e'|f' g' a' b'|]\n"

            };
        }
    });

    return Model;
});
