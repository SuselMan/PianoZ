/**
 * Created by Илья on 07.11.2015.
 */
define(function(require){
    "use strict";
    var Radio = require('backbone.radio');
    var channelMidi = Radio.channel('midi');
    var  Backbone = require('backbone');

    var is=false;
    var obj;
    var setting={};
    require("midi");


    var Midi=function(){
        if(!is){obj=new MidiWacher()}else{console.warn("уже создан")};
        is=true;
        return obj

    }

    var MidiWacher=Backbone.Model.extend({


    initialize:function (){

      //  this.m=null;
        navigator.requestMIDIAccess().then( this.onsuccesscallback.bind(this), this.onerrorcallback.bind(this));

        channelMidi.on("note:on",function(note,num){
            //console.log("on",note,num);
            if(num){
                MIDI.noteOn(0,num, 127, 0);
            }
            else{
                MIDI.noteOn(0, MIDI.keyToNote[note], 127, 0);
            }
        });

        channelMidi.on("note:off",function(note,num){
            //console.log("off",note,num);
            if(num){
                MIDI.noteOff(0,num, 0, 0);
            }
            else{
                MIDI.noteOff(0, MIDI.keyToNote[note], 0, 0);
            }
        });

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

            // Things you can do with the MIDIAccess object:
          //  var inputs = this.m.inputs; // inputs = MIDIInputMaps, you can retrieve the inputs with iterators
           // var outputs = this.m.outputs; // outputs = MIDIOutputMaps, you can retrieve the outputs with iterators
           // var iteratorInputs = inputs.values() // returns an iterator that loops over all inputs
          //  var input = iteratorInputs.next().value // get the first input
           // input.onmidimessage = this.myMIDIMessagehandler.bind(this); // onmidimessage( event ), event.data & event.receivedTime are populated
           // var iteratorOutputs = outputs.values() // returns an iterator that loops over all outputs
            var output = iteratorOutputs.next().value; // grab first output device
            setting.inputs=access.inputs;
            setting.outputs=access.outputs;

    },

    getMidiSettingModel:function(){


    },

    myMIDIMessagehandler:function(e){

            if(e.data.length>1){
                if(e.data[2]>0){
                    channelMidi.trigger("note:on",0, e.data[1]);
                }
                else{
                    channelMidi.trigger("note:off",0, e.data[1]);
                }

            }

        },

    onerrorcallback:function( err ) {
            console.warn( "MIDI access problem! Error code: " + err.code );
        }

    });

    return Midi


})