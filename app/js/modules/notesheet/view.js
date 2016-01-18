define(function(require) {
    "use strict";

    var Marionette = require("marionette");
    var abc = require("abc");
    var MIDI = require("midi");
    var channelMidi = require('backbone.radio').channel('midi');

    var View = Marionette.ItemView.extend({
        template: false,
        onRender: function() {
            window.abctune = abc.renderAbc(this.el, this.model.get('notesheet'))[0];
            var seq = abc.midi.sequence(window.abctune)[0];
            window.timeline = [];
            for (var i = 0; i < seq.length; i++) {
                var el = seq[i];
                if (el.el_type == 'note') {
                    window.timeline.push({ pitch: adjustPitch(el.pitches[0]) + 60, abselem: el.abselem});
                };
            };

            channelMidi.on("note:on",function(note,num){
                note = MIDI.keyToNote[note];
                el = window.timeline[0];
                if (el.pitch == note) {
                    el.abselem.highlight('','#0a0');
                    console.log(MIDI.noteToKey[window.timeline.shift()] + "matched");
                    if (window.timeline.length == 0) {
                        alert('Well done!');
                    };
                } else {
                    el.abselem.highlight();
                };
            });

        }
    });

    function extractOctave(pitch) {
        return Math.floor(pitch/7);
    }

    function extractNote(pitch) {
        pitch = pitch%7;
        if (pitch<0) pitch+=7;
        return pitch;
    }

    var scale = [0,2,4,5,7,9,11];
    function adjustPitch(note) {
        var pitch = note.pitch;
        // if (note.accidental) {
        //     switch(note.accidental) { // change that pitch (not other octaves) for the rest of the bar
        //     case "sharp":
        //         barAccidentals[pitch]=1; break;
        //     case "flat":
        //         barAccidentals[pitch]=-1; break;
        //     case "natural":
        //         barAccidentals[pitch]=0; break;
        //     case "dblsharp":
        //         barAccidentals[pitch]=2; break;
        //     case "dblflat":
        //         barAccidentals[pitch]=-2; break;
        //     }
        // }

        var actualPitch = extractOctave(pitch) *12 + scale[extractNote(pitch)];

        // if ( barAccidentals[pitch]!==undefined) {
        //     actualPitch +=  barAccidentals[pitch];
        // } else { // use normal accidentals
        //     actualPitch +=  accidentals[extractNote(pitch)];
        // }
        // actualPitch += transpose;
        return actualPitch;
    }

    return View;
});
