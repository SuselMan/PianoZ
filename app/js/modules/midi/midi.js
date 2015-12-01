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
    var MIDI=require("midi");


    var Midi=function(){
        if(!is){obj=new MidiWacher()}else{console.warn("уже создан")};
        is=true;
        return obj

    }

    var MidiWacher=Backbone.Model.extend({


    initialize:function (){

        navigator.requestMIDIAccess().then( this.onsuccesscallback.bind(this), this.onerrorcallback.bind(this));

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
               // console.log(state, progress);
                channelMidi.trigger("sounds:load:progress",progress);
               // TODO: make normal loader
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
            var device={};
            console.log("PORT",port);
            device.text = port.name;
            device.id=port.id;
            setting.inputs.push(device)
        });
        access.outputs.forEach( function( port, key ) {
            var device={};
            device.text = port.name;
            device.id=setting.outputs.length;
            setting.outputs.push(device)
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
        console.log(this.access);
        setting.input=newsetting.input;
        setting.output=newsetting.output;
        setting.sounds=newsetting.sounds;

        var input = this.access.inputs.get(setting.inputs[setting.input].id);
            console.log(input);
            input.onmidimessage = this.MIDIMessageEventHandler;

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