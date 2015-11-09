/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');

    var Midi=require('../midi/midi');



    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/settings/layout'),

        regions: {

            main: '.js-main'

        },
        events:{
            'click #js-close': 'close',
        },
        close:function(){
            console.log("STOP POPUP");
            this.module.stop();
        },
        initialize: function (options) {
            this.module=options.module;
            console.log("this.module",this.module);
        },
        onRender: function () {
           // var notes=Notes.getKeysCollection();
            console.log("SETTINGS");
          //  this.getRegion('piano').show(new Pianoroll({collection:new KeysColl(notes)}));
        },

        onLoadSuccess: function() {
          //  this.showChildView('content', new ListView({collection: this.collection}));
        },

        onLoadError: function() {
            // this.showChildView('content', new MessageViews.Warning({msg: "Не удалось получить список формул."}));
        }
    });

    return Layout;
});
