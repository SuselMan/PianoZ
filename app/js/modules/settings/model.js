/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');
    var channelGlobal = require('backbone.radio').channel('global');


    var Model = Backbone.Model.extend({

        defaults: {
            "input":  "",
            "output":     "",
            "sounds":    ""
        },

        save:function(){
            channelGlobal.trigger("save:settings",this.toJSON());
        }

       });


    return Model;
});
