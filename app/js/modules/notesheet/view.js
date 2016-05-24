define(function(require) {
    "use strict";

    var Marionette = require("marionette");
    var abc = require("abc");
    var MIDI = require("midi");
    var channelMidi = require('backbone.radio').channel('midi');

    var View = Marionette.ItemView.extend({
        template: false,

        events: {
            'click': function () {
                abc.startAnimation(this.el, this.tune, {showCursor: true,bpm:1});
                //abc.stopAnimation();
            }
        },

        onRender: function() {
            this.scale = [0,2,4,5,7,9,11];
            this.tune = abc.renderAbc(this.el, this.model.get('notesheet'), {}, {editable:true,add_classes: true})[0];
            var seq = abc.midi.sequence(this.tune)[0];
            this.timeline=[];
            for (var i = 0; i < seq.length; i++) {
                var el = seq[i];
                if (el.el_type == 'note') {
                    this.timeline.push({ pitch: this.adjustPitch(el.pitches[0]) + 60, abselem: el.abselem});
                };
            };

            channelMidi.on("note:on",function(note,num){
                note = MIDI.keyToNote[note];
                el = this.timeline[0];
                if (el.pitch == note) {
                    el.abselem.highlight('','#0a0');
                    console.log(MIDI.noteToKey[this.timeline.shift()] + "matched");
                    if (this.timeline.length == 0) {
                        alert('Well done!');
                    };
                } else {
                    el.abselem.highlight();
                };
            }.bind(this));

        },

        adjustPitch: function (note) {
            var pitch = note.pitch;
            var actualPitch = this.extractOctave(pitch) *12 + this.scale[this.extractNote(pitch)];
            return actualPitch;
        },

        extractOctave: function (pitch) {
            return Math.floor(pitch/7);
        },

        extractNote: function (pitch) {
           pitch = pitch%7;
           if (pitch<0) pitch+=7;
           return pitch;
        }

    });

    return View;
});

