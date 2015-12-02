/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        $=require('jquery'),
        select2 = require('select2'),
        Radio = require('backbone.radio');
    var MB_Converters = require('common/modelbinder_converters');
    var ModelBinder = require('Backbone.ModelBinder');

    var ChannelMidi = Radio.channel('midi');
    var Model = require('./model');
    var Midi=new require('modules/midi/midi')();

    var View = Marionette.ItemView.extend({

        template: require('hbs!templates/settings/midiSettings') ,
        model:new Model(),

        ui:{
            midiInput:"#midi-input",
            midiOutput:"#midi-output",
            saveBtn:"#save"
        },

        events: {

            'click @ui.saveBtn': 'save'
        },

        initialize: function (options) {

        },

        onRender: function () {
            var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
          //  bindings.sounds.converter = MB_Converters.CB;
            new ModelBinder().bind(this.model, this.el, bindings);
            var inputs=Midi.getMidiSettingModel().inputs;

            if(inputs &&inputs.length) {
               // console.log('#midi-input');
                this.$("#midi-input").select2({allowClear: true, data: inputs});
            }
            else {
                this.$("#midi-input").prop("placeholder", "No Device Detected");
                this.$("#midi-input").prop("disabled", true);
            }

            var outputs=Midi.getMidiSettingModel().outputs;
            if(outputs && outputs.length) {
                this.$("#midi-output").select2({ allowClear: true,	data:outputs });
            }
            else{
                this.$("#midi-output").prop("placeholder", "No Device Detected");
                this.$("#midi-output").prop("disabled", true);
            }
        },

        save:function(){
            this.model.save();
        }

    });




    return View;
});
