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


        setting.inputs=[{device:'device1',id:'0'},{device:'device2',id:'1'}];
        setting.outputs=[{device:'device1',id:'0'},{device:'device2',id:'1'}];
        setting.sounds=true;
        setting.input=null;
        setting.output=null;
        console.log(setting.inputs);

    },

    getMidiSettingModel:function(){
        return setting;
    },
    updateSetting:function(newsetting){
        setting=newsetting;
        console.log("Setting Was Update");
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