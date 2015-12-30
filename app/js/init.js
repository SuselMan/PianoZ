/**
 * Created by Илья on 25.10.2015.
 */

requirejs.config({
    baseUrl: '/js',

    shim: {
        'bootstrap-datepicker': {
            deps: ['jquery', 'bootstrap-all'],
            exports: "datepicker"
        },
        'bootstrap-datepicker-ru': {
            deps: ['bootstrap-datepicker']
        },
        'bootstrap-toggle': {
            deps: ['jquery'],
            exports: "jquery"
        },
        'select2': {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'midi': {
            deps: ['Base64', 'Base64binary', 'WebMIDIAPI', 'WebAudioAPI'],
            exports: 'MIDI'
        },
        'Base64binary': {
            exports: 'Base64Binary'
        },
        'abc': {
            deps: ['raphael'],
            exports: 'ABCJS'
        }
    },

    paths: {

        // Vendor paths
        midi:'bower/midi/build/MIDI',
        Base64:'bower/midi/inc/shim/Base64', // Provides atob() and btoa() functions for old IE (Base64 encryption-decryption)
        Base64binary:'bower/midi/inc/shim/Base64binary', // Needed for plugin.webaudio.js, but feels like doing same shit as atob()
        WebMIDIAPI: 'bower/midi/inc/shim/WebMIDIAPI', // WebMIDIAPI polyfill
        WebAudioAPI: 'bower/midi/inc/shim/WebAudioAPI', // Consistency between browser's WebAudioAPI implementations
        jquery: 'bower/jquery/dist/jquery',
        "select2": "bower/select2/select2",
        underscore: 'bower/underscore/underscore',
        backbone: 'bower/backbone/backbone',
        marionette: 'bower/backbone.marionette/lib/backbone.marionette',
        'marionette.subrouter': 'bower/backbone.marionette.subrouter/backbone.marionette.subrouter',
        'Backbone.ModelBinder': 'bower/Backbone.ModelBinder/Backbone.ModelBinder',
        'backbone.radio': 'bower/backbone.radio/build/backbone.radio',
         moment: 'bower/momentjs/moment',
        'backbone.paginator': 'bower/backbone.paginator/lib/backbone.paginator',
        'backbone-deep-model': 'bower/backbone-deep-model/distribution/deep-model',
        'pnotify': 'bower/pnotify/pnotify.core',

        bootstrap: 'bower/bootstrap',
        'bootstrap-all': 'bower/bootstrap/dist/js/bootstrap',
        "bootstrap-datepicker": "bower/bootstrap-datepicker/js/bootstrap-datepicker",
        "bootstrap-datepicker-ru": "bower/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min",
        "bootstrap-toggle": "bower/bootstrap-toggle/js/bootstrap-toggle",

        'abc': 'lib/abcjs_basic_noraphael_2.3-min',
        'raphael': 'bower/raphael/raphael',

        /* require handlebars plugin - Alex Sexton */
        handlebars: 'bower/require-handlebars-plugin/hbs/handlebars',
        i18nprecompile: 'bower/require-handlebars-plugin/hbs/i18nprecompile',
        json2: 'bower/require-handlebars-plugin/hbs/json2',
        hbs: 'bower/require-handlebars-plugin/hbs',

        sockjs: 'libs/sockjs-0.3.min',

        // App paths
        modules: 'modules',
        templates: '../templates',
        utils: 'core/utils/utils',
        cache: 'core/utils/cache',
        common: 'common'

    },


    hbs: {
        disableI18n: true,
        helperPathCallback: function (name) {
            "use strict";
            return 'templates/helpers/' + name;
        }
    },

    deps: ['main']
});
