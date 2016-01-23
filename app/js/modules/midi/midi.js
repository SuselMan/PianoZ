/**
 * Created by Илья on 07.11.2015.
 */
define(function(require){
    "use strict";
    var Radio = require('backbone.radio');
    var channelMidi = Radio.channel('midi');
    var channelGlobal = require('backbone.radio').channel('global');
    var  Backbone = require('backbone');

    var is=false;
    var obj;
    var setting={};
    var MIDI=require("midi");


    var Midi=function(){
        if(!is){obj=new MidiWacher()};
        is=true;
        return obj;
    }

    var MidiWacher=Backbone.Model.extend({


    initialize:function (){

        navigator.requestMIDIAccess().then( this.onsuccesscallback.bind(this), this.onerrorcallback.bind(this));
        channelGlobal.on("save:settings",this.updateSetting, this);
        channelMidi.on("note:on",function(note,num){

            if(num){
                MIDI.noteOn(0,num, 127, 0);
            }
            else{
                MIDI.noteOn(0, MIDI.keyToNote[note], 127, 0);
            }
        });

        channelMidi.on("note:off",function(note,num){

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
                channelMidi.trigger("sounds:load:progress",progress);
            },
            onsuccess: function() {
                MIDI.setVolume(0, 127);
            }

        });


    },
    onsuccesscallback:function(access){

        this.access=access;
        setting.inputs=[];
        setting.outputs=[];
        access.inputs.forEach( function( port, key ) {
            setting.inputs.push({
                text: port.name,
                id: port.id
            });
        });
        access.outputs.forEach( function( port, key ) {
            setting.outputs.push({
                text: port.name,
                id: port.id
            });
        });
        setting.sounds=true;
        setting.input=null;
        setting.output=null;
        console.log(access.inputs);

    },

    getMidiSettingModel:function(){
        return setting;
    },

    updateSetting:function(newsetting){

        setting.input=newsetting.input;
        setting.output=newsetting.output;
        setting.sounds=newsetting.sounds;
        if(setting.input) {
            var input = this.access.inputs.get(setting.input);
            console.log(input);
            input.onmidimessage = this.MIDIMessageEventHandler;
        }
        setting.sounds?MIDI.setVolume(0, 127):MIDI.setVolume(0,0);
        console.log("Setting Was Update");
    },
    MIDIMessageEventHandler:function(e){

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
