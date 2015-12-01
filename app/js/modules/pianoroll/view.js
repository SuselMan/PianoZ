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
            return m.flat ? require('hbs!templates/pianoroll/blackKey') : require('hbs!templates/pianoroll/whiteKey');
        },
        className: function(){
            return this.model.get('flat') ? 'black-key' : 'white-key';

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
            channelMidi.on("note:on",function(note,num){
                var key;

                if(num){
                    key=MIDI.noteToKey[num]
                }
                else{
                    key=MIDI.keyToNote[note]
                }
                //cosole.log("key"+key)
                if(key==this.model.id){
                    this.$el.addClass("down")

                }

            }.bind(this));

            channelMidi.on("note:off",function(note,num){
                var key;

                if(num){
                    key=MIDI.noteToKey[num]
                }
                else{
                    key=MIDI.keyToNote[note]
                }
                //cosole.log("key"+key)
                if(key==this.model.id){
                    this.$el.removeClass("down")

                }

            }.bind(this));






        },
        sendNoteOn:function(){
          //  console.log()
            channelMidi.trigger("note:on",this.model.id);

        },
        sendNoteOff:function(){
          //  console.log()
            channelMidi.trigger("note:off",this.model.id);

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

            channelMidi.on("sounds:load:progress",function(i){
                console.log(i);
                var progress=i*100;
                this.$('.sounds-loader').attr('style','width:'+progress+'%');

            }.bind(this));


        }
    });

    return KeyboardView;
});
