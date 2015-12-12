define(function(require) {
    "use strict";

    var Marionette = require('marionette');

    var Model = require('./model');
    var View = require('./view');

    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/notesheet/layout'),

        regions: {
            sheetsShow: '.js-sheets-show'
        },

        onRender: function () {
            this.sheetsShow.show(new View({model: new Model}));
        }

    });

    return Layout;
});
