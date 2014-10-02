'use strict';

var $ = require('jquery');
var Bacon = require('baconjs');
// var

$.fn.asEventStream = Bacon.$.asEventStream;

var registerBacon = function() {
  var cliks = $("h1").asEventStream("click");
  cliks.onValue(function() { alert("got bacon?") });
}


registerBacon();
