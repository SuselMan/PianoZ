/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');

    var Pianoroll = require('../pianoroll/view');
    var Notes = require('../pianoroll/notes');
    var KeysColl = require('../pianoroll/collection');
  //  var SingletonModel=require('backbone-singleton');
    var Midi=require('../midi/midi');



    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/gameWindow/layout'),

        regions: {
            sheets: '.js-sheets',
            piano: '.js-piano'
        },

        initialize: function (options) {
          //  this.pianoroll=new Pianoroll();
            this.midi=new Midi();
            this.midi2=new Midi();


        },
        onRender: function () {
            var notes=Notes.getKeysCollection();
            console.log(notes);
            this.getRegion('piano').show(new Pianoroll({collection:new KeysColl(notes)}));
          //  App.pianoRoll(this.getRegion('piano'));

        },

        onLoadSuccess: function() {
          //  this.showChildView('content', new ListView({collection: this.collection}));
        },

        onLoadError: function() {
            // this.showChildView('content', new MessageViews.Warning({msg: "�� ������� �������� ������ ������."}));
        }
    });

    return Layout;
});
