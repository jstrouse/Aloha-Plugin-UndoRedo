/*
 * Custom Aloha Plugin to Trigger Undo/Redo Keypress events with a button
 * Author: Jeremy Strouse (jstrouse@strouseconsulting.com)
*/

define(
[ 'aloha',
  'aloha/jquery',
  'aloha/plugin',
  'ui/ui',
  'ui/button',
  'undo/vendor/undo',
  'i18n!undoredo/nls/i18n',
  'i18n!aloha/nls/i18n',
  'css!undoredo/css/undoredo.css'],
function (Aloha, jQuery, Plugin, Ui, Button, i18n, i18nCore){
    "use strict";
 
    return Plugin.create( 'undoredo', {
      languages: ['en'],
      init: function() {
        if (!Aloha.settings.plugins.undoredo) {
          Aloha.settings.plugins.undoredo = {}
        }
        var that = this,
            buttons = [],
            names = ['undo', 'redo' ],
            tooltips = ['Undo', 'Redo' ];

        for (var i=0; i < names.length; i++) {
          var value = names[i];
          var index = i;

          Ui.adopt(value, Button, {
            tooltip: tooltips[index],
            icon: "aloha-button-" + value,
            name: value,
            scope: 'Aloha.continuoustext',
            click: function () {
                var btnName = this.name;

                if (Aloha.activeEditable) {
                  Aloha.activeEditable.obj[0].focus()
                } 

                if (btnName == 'undo') {
                  var e = jQuery.Event("keydown");
                  e.metaKey = true;
                  e.ctrlKey = true;
                  e.shiftKey = false;
                  e.keyCode = 90;
                  e.which = 90;
                  Aloha.activeEditable.obj.trigger(e);
                }
                else {
                  var e = jQuery.Event("keydown");
                  e.metaKey = true;
                  e.ctrlKey = true;
                  e.shiftKey = true;
                  e.keyCode = 90;
                  e.which = 90;
                  Aloha.activeEditable.obj.trigger(e);
                }
              }
          });
        };
    }
  });
});
