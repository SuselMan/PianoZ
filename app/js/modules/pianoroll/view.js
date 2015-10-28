/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    "use strict";

    var Marionette = require('marionette'),
        Backbone = require('backbone');
    var $=require('jquery');

    var CollectionView = Marionette.CollectionView.extend({
        template: require('hbs!templates/pianoroll/layout'),

        ui:{
            example:"#exampleC"
        },
        initialize: function (options) {
            //  this.pianoroll=new Pianoroll();
            console.log("initialize");
        },

        onRender: function () {

        }
    });


    var View = Marionette.ItemView.extend({
        template: require('hbs!templates/pianoroll/layout'),

        ui:{
          example:"#exampleC"
        },
        initialize: function (options) {
            //  this.pianoroll=new Pianoroll();
            console.log("initialize");
        },

        onRender: function () {
            console.log("onRender ", this.el.querySelector('canvas').getContext('2d'));
            var example= this.el.querySelector("#exampleC");
            console.log(example);
            var ctx     = example.getContext('2d');
            example.width  = 640;
            example.height = 480;
            ctx.strokeRect(15, 15, 266, 266);
            ctx.strokeRect(18, 18, 260, 260);
            ctx.fillRect(20, 20, 256, 256);
            for (var i = 0; i < 8; i += 2)
                for (var j = 0; j < 8; j += 2) {
                    ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
                    ctx.clearRect(20 + (i + 1) * 32, 20 + (j + 1) * 32, 32, 32);
                }

        }
    });

    return View;
});
