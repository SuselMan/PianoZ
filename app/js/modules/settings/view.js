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
    var model = require('./model');


    var View = Marionette.ItemView.extend({
        template:'hbs!templates/settings/midi-settings' ,

        ui:{
            midiInput:"#midi-input"
        },
        initialize: function (options) {

        },

        onRender: function () {

        }

    });




    return View;
});
