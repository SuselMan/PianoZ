define(function(require) {
    "use strict";

    var Marionette = require("marionette");
    var abc = require("abc");

    var View = Marionette.ItemView.extend({
        template: false,
        onRender: function() {
            abc.renderAbc(this.el, this.model.get('notesheet'));
        }
    });

    return View;
});
