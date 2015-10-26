/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        Pianoroll = require('../pianoroll/module');


    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/gameWindow/layout'),

        regions: {
            sheets: '.js-sheets',
            piano: '.js-piano'
        },

        initialize: function (options) {
          //  this.pianoroll=new Pianoroll();
        },

        onRender: function () {
           // this.getRegion('piano').show(pianoroll.view);
        },

        onLoadSuccess: function() {
            this.showChildView('content', new ListView({collection: this.collection}));
        },

        onLoadError: function() {
            // this.showChildView('content', new MessageViews.Warning({msg: "Не удалось получить список формул."}));
        }
    });

    return Layout;
});
