define(function(require) {
  "use strict";
  
  var Marionette = require("marionette");
  
  var sampleSheet = "X:1\n" + 
                    "T:Notes\n" + 
                    "M:C\n" + 
                    "L:1/4\n" +
                    "K:C\n" + 
                    "C, D, E, F,|G, A, B, C|D E F G|A B c d|e f g a|b c' d' e'|f' g' a' b'|]\n";
  
  var Layout = Marionette.ItemView.extend({
    template: false,
    onRender: function() {
      ABCJS.renderAbc(this.el, sampleSheet);
    }
  });

  return Layout;
});
