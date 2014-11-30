// /usr/local/bin/node /home/pi/apps/wakeup/wakeup.js

var lifx = require('lifx');
var util = require('util');
var packet = require('./packet');

var lx = lifx.init();

var message = packet.getLightState();
lx.sendToAll(message);

var lightLevel = 0.00;
var minute = 0.00;

lx.on('bulb', function(b) {

	console.log('New bulb found: ' + b.name);

	lx.lightsOn();
	
	_setLight(0);
	_counter();

});

var _counter = function() {


	setTimeout(function() {

		minute++;

		lightLevel = Math.round((Math.pow(1.25,minute)/87)*100);

		console.log(minute,lightLevel);
		_setLight(lightLevel);

		if (lightLevel != 100) {

			_counter();

		} else {
			
			// shutdown sequence
			setTimeout(function() {

				lx.lightsOff();
				console.log("seq ended!");

			}, 600000);

			// shutdown sequence
			setTimeout(function() {

				lx.close();

			}, 601000);

		}

	}, 60000);
	 
};


var _setLight = function(value) {

	var rounded = Math.round(65535*(value/100));
	lx.lightsColour(0x0000, 0x0000, rounded, 0x0af0, 0x0513);

};