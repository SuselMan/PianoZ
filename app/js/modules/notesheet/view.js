define(function(require) {
    "use strict";

    var Marionette = require("marionette");
    var abc = require("abc");

    var View = Marionette.ItemView.extend({
        template: false,

        events: {
            'click': function () {
                abc.startAnimation(this.el, this.tune, {showCursor: true});
            }
        },

        onRender: function() {
            this.tune = abc.renderAbc(this.el, this.model.get('notesheet'), {}, {add_classes: true})[0];
        }
    });

    return View;
});
