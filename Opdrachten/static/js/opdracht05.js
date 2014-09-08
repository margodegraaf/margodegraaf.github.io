// GLOBAL
var POSITION_UPDATED = 'POSITION_UPDATED';
var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = false;


// FUNCTIE
function EventTarget() {
	this._listeners = {}
};

// PROTOTYPE
EventTarget.prototype = {
	constructor: EventTarget,
	addListener: function(a, c) {
		"undefined" == typeof this._listeners[a] && (this._listeners[a] = []);
		this._listeners[a].push(c)
	},
	
	fire: function(a) {
		"string" == typeof a && (a = {
			type: a
		});
		a.target || (a.target = this);
		if (!a.type) throw Error("Event object missing 'type' property.");
		if (this._listeners[a.type] instanceof Array) for (var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++) c[b].call(this, a)
	},
	
	removeListener: function(a, c) {
		if (this._listeners[a] instanceof Array) for (var b = this._listeners[a], d = 0, e = b.length; d < e; d++) if (b[d] === c) {
			b.splice(d, 1);
			break
		}
	}
};

// CONSTRUCTOR OBJECT
var ET = new EventTarget();


// LITERAL OBJECT
var GPS = {
	init: function() {
		// LOCAL
		var GPS_AVAILABLE = 'GPS_AVAILABLE';
		var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
		debug_message("Controleer of GPS beschikbaar is...");
		ET.addListener(GPS_AVAILABLE, _start_interval);
		ET.addListener(GPS_UNAVAILABLE, function() {
			debug_message('GPS is niet beschikbaar.')
		});
		(geo_position_js.init()) ? ET.fire(GPS_AVAILABLE) : ET.fire(GPS_UNAVAILABLE);
	},
	
	_start_interval: function(event) {
		var REFRESH_RATE = 1000;
		debug_message("GPS is beschikbaar, vraag positie.");
		_update_position();
		interval = self.setInterval(_update_position, REFRESH_RATE);
		ET.addListener(POSITION_UPDATED, _check_locations);
	},
	
	_update_position: function() {
		intervalCounter++;
		geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {
		enableHighAccuracy: true
		});
	},
	
	_set_position: function(position) {
		currentPosition = position;
		ET.fire("POSITION_UPDATED");
		debug_message(intervalCounter + " positie lat:" + position.coords.latitude + " long:" + position.coords.longitude);
	},
	
	_check_locations: function(event) {
		for (var i = 0; i < locaties.length; i++) {
				var locatie = {
				coords: {
					latitude: locaties[i][3],
					longitude: locaties[i][4]
					}
				};
			if (_calculate_distance(locatie, currentPosition) < locaties[i][2]) {
				if (window.location != locaties[i][1] && localStorage[locaties[i][0]] == "false") {
					try {
						(localStorage[locaties[i][0]] == "false") ? localStorage[locaties[i][0]] = 1 : localStorage[locaties[i][0]]++;
					} catch (error) {
						debug_message("Localstorage kan niet aangesproken worden: " + error);
					}
					window.location = locaties[i][1];
					debug_message("Speler is binnen een straal van " + locaties[i][2] + " meter van " + locaties[i][0]);
				}
			}
		}
	},
	
	_calculate_distance: function(p1, p2) {
		var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
	}
};

// LITERAL OBJECT
var googleMaps = {
	generate_map: function(myOptions, canvasId) {
		var LINEAIR = "LINEAIR";
		var markerRij = [];
		debug_message("Genereer een Google Maps kaart en toon deze in #" + canvasId)
		map = new google.maps.Map(document.getElementById(canvasId), myOptions);
		var routeList = [];
		debug_message("Locaties intekenen, tourtype is: " + tourType);
		for (var i = 0; i < locaties.length; i++) {
			try {
				(localStorage.visited == undefined || isNumber(localStorage.visited)) ? localStorage[locaties[i][0]] = false : null;
			} catch (error) {
				debug_message("Localstorage kan niet aangesproken worden: " + error);
			}
			var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
			routeList.push(markerLatLng);
			markerRij[i] = {};
			for (var attr in locatieMarker) {
				markerRij[i][attr] = locatieMarker[attr];
			}
			markerRij[i].scale = locaties[i][2] / 3;
			var marker = new google.maps.Marker({
				position: markerLatLng,
				map: map,
				icon: markerRij[i],
				title: locaties[i][0]
			});
		}
		if (tourType == LINEAIR) {
			debug_message("Route intekenen");
			var route = new google.maps.Polyline({
				clickable: false,
				map: map,
				path: routeList,
				strokeColor: 'Black',
				strokeOpacity: .6,
				strokeWeight: 3
			});
		}
		currentPositionMarker = new google.maps.Marker({
			position: kaartOpties.center,
			map: map,
			icon: positieMarker,
			title: 'U bevindt zich hier'
		});
		ET.addListener(POSITION_UPDATED, update_positie);
	},
	
	isNumber: function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	
	update_positie: function(event) {
		var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
		map.setCenter(newPos);
		currentPositionMarker.setPosition(newPos);
	}		
};

// LITERAL OBJECT
var debug = {
	_geo_error_handler: function (code, message) {
		debug_message('geo.js error ' + code + ': ' + message);
	},
	
	debug_message: function(message) {
		(customDebugging && debugId) ? document.getElementById(debugId).innerHTML : console.log(message);
	},
	
	set_custom_debugging: function(debugId) {
		debugId = this.debugId;
		customDebugging = true;
	}
};