define(function(require) {
    "use strict";

    var Marionette = require('marionette');

    var Model = require('./model');
    var View = require('./view');

    var abctemp = "X:1\n" +
        "T:Notes\n" +
        "M:C\n" +
        "L:1/4\n" +
        "K:C\n";
    var data = [
        { id: 0, text: 'test1', notesheet: abctemp + "C, D, E, F,|]\n" },
        { id: 1, text: 'test2', notesheet: abctemp + "G, A, B, C|]\n" },
        { id: 2, text: 'test3', notesheet: abctemp + "D  E  F  G|]\n" },
        { id: 3, text: 'test4', notesheet: abctemp + "A  B  c  d|]\n" },
        { id: 4, text: 'test5', notesheet: abctemp + "e  f  g  a|]\n" }
    ];

    var Layout = Marionette.LayoutView.extend({
        template: require('hbs!templates/notesheet/layout'),

        regions: {
            sheetsShow: '.js-sheets-show'
        },

        ui: {
            playBtn:'#play'
        },

        events: {
            'click @ui.playBtn': 'showSheetsView'
        },

        initialize: function() {
            this.model = new Model();
        },

        onRender: function () {
            this.$('#sheets-select').select2({
                data: data,
                placeholder: 'Select music sheets to play',
                // allowClear: true
            });
        },

        showSheetsView: function() {
            this.model.set('notesheet', this.$('#sheets-select').select2('data').notesheet);
            this.sheetsShow.show(new View({model: this.model}));
        }
    });

    return Layout;
});
