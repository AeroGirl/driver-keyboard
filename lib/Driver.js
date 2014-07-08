'use strict'

var Keyboard = require('./Keyboard');

function Driver() {
  this.name = 'com.ninjablocks.keyboard';
}

Ninja.driver(Driver); //registers this class as a driver in the systen


Driver.prototype.start = function(config, cb) { 
  var self = this;
  new Keyboard(self);

  cb(null);
};

Driver.prototype.stop = function(cb) {
  cb(null);
};

module.exports = Driver;
