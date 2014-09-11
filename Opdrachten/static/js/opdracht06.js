/* 6.3: NameSpace
Om je script uiteindelijk in verschillende bestanden te kunnen opdelen heb je een manier nodig om de code in de verschillende bestanden aan te kunnen roepen. Voeg hiervoor een NameSpace object toe en 'koppel' deze aan alle objecten in het script. */

/* Uitleg
Een NameSpace is een techniek die ervoor zorgt dat je script geen botsingen krijgt met andere scripts. Als je geen NameSpace gebruikt kan het zijn dat je bijvoorbeeld dezelfde functie-, object of variabele naam gebruikt waardoor er errors onstaan. Ook blijft je script erg overzichtelijk omdat alles netjes word gegroepeert. */

var cmdAanGeo = cmdAanGeo || {};

/* 6.1: Self Invoking Anonymous Function
Het GEO script is nu netjes gestructureerd met objecten, maar deze objecten staan in de Global Scope. 
Plaats de objecten in een Self Invoking Anpnymous Function en hiermee dus in een afgeschermde Local Scope. */

/* Uitleg
Een functie automatisch laten starten kan met "self-invoking".
De funtie start zonder dat je hem aanroept.
Zet haakjes om de functie heen. VB: (function{}) 
En schrijf er ook nog twee lege haakjes achter. VB: (function{}) ();
*/

(function() {
	// Configuratie mogelijk
	cmdAanGeo.config =  {};


	/* 6.2: Application structure
	Voeg aan het script een 'controller' object toe met een 'init' methode vanuit waar de andere objecten worden geïnitialiseerd. */
	
	/* Uitleg
	Een controller object met een init (intialize) methode bevat 1 functie die alle alle andere functies aanroept, zodat je deze niet allemaal apart hoeft aan te maken.
	Zo blijft je script overzichtelijk. Ik zie het zelf een beetje als een inhoudsopgave */
	cmdAanGeo.controller = {
		init: function() {
			var checkController = "Contoller";
			console.log(checkController + 1);
			
			cmdAanGeo.gps.startInterval();
			cmdAanGeo.gps.updatePosition();
			cmdAanGeo.gps.setPosition();
			cmdAanGeo.gps.checkLocations();
			cmdAanGeo.gps.calculateDistance();
			cmdAanGeo.map.generate();
			cmdAanGeo.map.updatePosition();
			cmdAanGeo.debug.errorHandler();
			cmdAanGeo.debug.message();
			cmdAanGeo.debug.setCustomDebugging();
			cmdAanGeo.helper.isNumber();
		}
	};
	
	// Alle 'gps' functions
	cmdAanGeo.gps = {
		checkGeo: "Geo",
		startInterval: function() {
			console.log(this.checkGeo + 1);
		},
		updatePosition: function() {
			console.log(this.checkGeo + 2);
		},
		setPosition: function() {
			console.log(this.checkGeo + 3);
		},
		checkLocations: function() {
			console.log(this.checkGeo + 4);
		},
		calculateDistance: function() {
			console.log(this.checkGeo + 5);
		}
	};

	// Alle 'map' functions
	cmdAanGeo.map = {
		checkMap: "Map",
		generate: function() {
			console.log(this.checkMap + 1);
		},
		updatePosition: function() {
			console.log(this.checkMap + 2);
		}
	};

	// Alle 'debug' functions
	cmdAanGeo.debug = {
		checkDebug: "Debug",
		errorHandler: function() {
			console.log(this.checkDebug + 1);
		},
		message: function() {
			console.log(this.checkDebug + 2);
		},
		setCustomDebugging: function() {
			console.log(this.checkDebug + 3);
		}
	};

	// Alle 'helper' functions
	cmdAanGeo.helper = {
		checkHelper: "Helper",
		isNumber: function() {
			console.log(this.checkHelper + 1);
		}
	};

// Start de functie 'init' uit het object 'cmdAanGeo.controller'
cmdAanGeo.controller.init();
})();