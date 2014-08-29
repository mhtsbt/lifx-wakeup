// /usr/local/bin/node /home/pi/apps/wakeup/wakeup.js

var lifx = require('lifx');
var util = require('util');
var packet = require('packet');

var lx = lifx.init();

var lightLevel = 0;

lx.on('bulb', function(b) {

	console.log('New bulb found: ' + b.name);

	lx.lightsOn();
	
	_setLight(0);
	_counter();

});


var _counter = function() {


	setTimeout(function() {
		lightLevel += 10;

		console.log(lightLevel);
		_setLight(lightLevel);

		if (lightLevel != 100) {
			_counter();
		} else {
			_shutdown();
		}

	}, 120000);
	 
};


var _setLight = function(value) {

	var rounded = Math.round(65535*(value/100));
	lx.lightsColour(0x0000, 0x0000, rounded, 0x0af0, 0x0513);

};

var _shutdown = function() {

	setTimeout(function() {
		console.log("seq ended!");
		lx.close();
		process.stdin.pause();
	}, 600000);

};
