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
    var Radio = require('backbone.radio');
    var channelMidi = Radio.channel('midi');
        require("midi");



    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/gameWindow/layout'),

        regions: {
            sheets: '.js-sheets',
            piano: '.js-piano'
        },

        initialize: function (options) {
          //  this.pianoroll=new Pianoroll();
            this.m=null;
            navigator.requestMIDIAccess().then( this.onsuccesscallback.bind(this), this.onerrorcallback.bind(this));
            channelMidi.comply("note:on",function(note,num){console.log("on",note,num);
                if(num){
                    MIDI.noteOn(0,num, 127, 0);
                }
                else{
                    MIDI.noteOn(0, MIDI.keyToNote[note], 127, 0);
                }
            });

            channelMidi.comply("note:off",function(note,num){console.log("off",note,num);
                if(num){
                    MIDI.noteOff(0,num, 0, 0);
                }
                else{
                    MIDI.noteOff(0, MIDI.keyToNote[note], 0, 0);
                }
            });
            console.log(MIDI);

            MIDI.loadPlugin({
                soundfontUrl: "./soundfont/",
                instrument: "acoustic_grand_piano",
                onprogress: function(state, progress) {
                    console.log(state, progress);
                },
                onsuccess: function() {
                    var delay = 0; // play one note every quarter second
                    var note = 50; // the MIDI note
                    var velocity = 127; // how hard the note hits
                    // play the note
                    MIDI.setVolume(0, 127);
                    MIDI.noteOn(0, note, velocity, delay);
                    MIDI.noteOff(0, note, delay + 0.75);
                 //   console.log();
                }
            });



        },

        onsuccesscallback:function(access){
            console.log(access);
            this.m = access;

            // Things you can do with the MIDIAccess object:
            var inputs = this.m.inputs; // inputs = MIDIInputMaps, you can retrieve the inputs with iterators
            var outputs = this.m.outputs; // outputs = MIDIOutputMaps, you can retrieve the outputs with iterators

            var iteratorInputs = inputs.values() // returns an iterator that loops over all inputs
            var input = iteratorInputs.next().value // get the first input

            input.onmidimessage = this.myMIDIMessagehandler.bind(this); // onmidimessage( event ), event.data & event.receivedTime are populated

            var iteratorOutputs = outputs.values() // returns an iterator that loops over all outputs
            var output = iteratorOutputs.next().value; // grab first output device

            output.send( [ 0x90, 0x45, 0x7f ] ); // full velocity note on A4 on channel zero
            output.send( [ 0x80, 0x45, 0x7f ], window.performance.now() + 1000 ); // full velocity A4 note off in one second.

        },


        myMIDIMessagehandler:function(e){
           if(e.data.length>1){
               if(e.data[2]>0){
                   channelMidi.command("note:on",0, e.data[1]);
               }
               else{
                   channelMidi.command("note:off",0, e.data[1]);
               }

           }
        },

        onerrorcallback:function( err ) {
        console.log( "uh-oh! Something went wrong! Error code: " + err.code );
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
            // this.showChildView('content', new MessageViews.Warning({msg: "Не удалось получить список формул."}));
        }
    });

    return Layout;
});
