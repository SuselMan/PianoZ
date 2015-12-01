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
            this.$("#midi-input").select2({ allowClear: true,	data:inputs });


            var outputs=Midi.getMidiSettingModel().outputs;
            this.$("#midi-output").select2({ allowClear: true,	data:outputs });
        },

        save:function(){
            this.model.save();
        }

    });




    return View;
});
