/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');
    var $=require('jquery');
    var Radio = require('backbone.radio');
    var channelMidi = Radio.channel('midi');



    var View = Marionette.ItemView.extend({
        template: function(m){
            if(m.sharp) {return require('hbs!templates/pianoroll/blackKey');}
            return require('hbs!templates/pianoroll/whiteKey');
        },
        className:function(){

            if(this.model.get('sharp')) {return 'black-key'}
            return 'white-key'

        },
        events: {
            'mousedown': 'sendNoteOn',
            'mouseup': 'sendNoteOff',
        },
        ui:{
            example:"#exampleC"
        },
        initialize: function (options) {
            //  this.pianoroll=new Pianoroll();

        },

        onRender: function () {
            console.log("key"+this.el);

        },
        sendNoteOn:function(){
          //  console.log()
            channelMidi.command("note:on",this.model.id);

        },
        sendNoteOff:function(){
          //  console.log()
            channelMidi.command("note:off",this.model.id);

        }

    });

    var KeyboardView = Marionette.CompositeView.extend({
        template: require('hbs!templates/pianoroll/layout'),
        childView:View,
        className:"keyboard",

        initialize: function () {
            //  this.pianoroll=new Pianoroll();
            console.log("initialize",this.collection);
        },

        onRender: function () {

        }
    });




    return KeyboardView;
});
