/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');
    var Midi=new require('modules/midi/midi')();



    var Model = Backbone.Model.extend({

        defaults: {
            "input":  "",
            "output":     "",
            "sounds":    ""
        },
        initialize: function() {


        },

        save:function(){
            Midi.updateSetting(this.toJSON());
        }


       });


    return Model;
});
