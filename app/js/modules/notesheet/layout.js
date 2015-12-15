define(function(require) {
    "use strict";

    var Marionette = require('marionette');

    var Collection = require('./collection');
    var View = require('./view');

    var abctemp = "X:1\n" +
        "T:Notes\n" +
        "M:C\n" +
        "L:1/4\n" +
        "K:C\n";
    var data = [
        { title: 'test1', notesheet: abctemp + "C, D, E, F,|]\n" },
        { title: 'test2', notesheet: abctemp + "G, A, B, C|]\n" },
        { title: 'test3', notesheet: abctemp + "D  E  F  G|]\n" },
        { title: 'test4', notesheet: abctemp + "A  B  c  d|]\n" },
        { title: 'test5', notesheet: abctemp + "e  f  g  a|]\n" }
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
            this.collection = new Collection(data);
        },

        onRender: function () {
            this.$('#sheets-select').select2({
                id: 'cid',
                data: {
                    results: this.collection.models,
                    text: function(el) {return el.get('title')}
                },
                placeholder: 'Select music sheets to play',
                // allowClear: true
            });
        },

        showSheetsView: function() {
            this.sheetsShow.show(new View({
                model: this.collection.get(this.$('#sheets-select').val())
            }));
        }
    });

    return Layout;
});
