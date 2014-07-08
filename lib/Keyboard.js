var keypress = require('keypress');

function Device(driver) {

  this.driver = driver;
  this.idType = 'keyboard';
  this.id = 'keyboard';
}

Ninja.device(Device);

Device.prototype.start = function(config, cb) {
  var self = this;
  var log = this.log;

  self.announceChannel('keyboard');

// make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

// listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    log.debug("Received keypress", ch);
    if (key && key.ctrl && key.name == 'c') {
      process.exit(0);
    }

//sends state based on the "keyboard protocol" defined at sphere-schema/protocol/keyboard.json
  self.sendState("keyboard", { "value" : key.name, "shift":key.shift, "ctrl":key.ctrl })
  
});

  process.stdin.setRawMode(true);
  process.stdin.resume();

  cb();
};

Device.prototype.stop = function(cb) {

};

module.exports = Device;
