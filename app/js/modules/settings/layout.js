/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');

    var Midi=require('../midi/midi');
    var View=require('./view');
    var channelGlobal = require('backbone.radio').channel('global');



    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/settings/layout'),

        regions: {

            main: '.js-settings'

        },
        events:{
            'click #js-close': 'close'
        },
        close:function(){
            this.module.stop();
        },
        initialize: function (options) {
            this.module=options.module;
           // console.log("this.module",this.module);
        },
        onRender: function () {
           // var notes=Notes.getKeysCollection();
            //console.log("SETTINGS");
            this.getRegion('main').show(new View());
            channelGlobal.on("saved:settings",this.close.bind(this));
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
