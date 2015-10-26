/**
 * Created by i.pavluhin on 26.10.2015.
 */

define(function (require) {
    'use strict';

    var Marionette = require('marionette'),
        App = require('app');

    var Layout = require('./layout');
    var Module = App.module('Game-window', {startWithParent: false});

    var Controller = Marionette.Object.extend({
        initialize: function () {
            this.region = App.regionContent;
        },

        onDestroy: function () {

        },

        showLayout: function () {
            this.region.show(new Layout());
        }
    });

    Module.on('before:start', function (options) {
        this.controller = new Controller(options);
    });

    Module.on('start', function () {
        this.controller.showLayout();
    });

    Module.on('stop', function() {
        return this.controller && (this.controller.destroy());
    });

    return Module;
});
