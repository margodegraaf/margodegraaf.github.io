// Namespace (global scope) 
var movieApp = movieApp || {};																				// Het content.js bestand wordt als eerste ingeladen van mijn zelfgemaakte code bestanden.


(function() { 																								// Self invoking anonymous function
	// CONTENT
	movieApp.content = {
		// ABOUT
		about: {
			title: "About this app",
			description: "<p>Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all.</p>"
+
"<p>I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks.</p>"
+
"<p>Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.</p>"
+
"<p>That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world.</p>"
		},
		// MOVIES
		movies: {
			title: "Sorry, er gaat iets mis"
		},
		// DIRECTIVES
		directives: {	
			title: { 																						// Maakt van de url een nette variant. 
				href: function() { 
					return "#movies/detail/" + this.id + "/" + this.title.toLowerCase().replace(/\ /g,'-'); /* Als eerste laat hij zien: "#movies/detail/"..
																											.. daarna volgt het id dat gekoppeld is aan het object waarop geklikt is.. daarna pakt hij ook nog de title van dat object 																												en maakt hij alle letters klein en maakt hij van alle spaties een streepje. Bijvoorbeeld: #movies/detail/1/evil-dead */
				}
			},
			
			score: { 																						// Maakt een gemiddelde score van alle review cijfers
				text: function() { 
					var map = _.pluck(this.reviews, "score").map(function (value){ return value }); 		// Ga naar movieApp.movies.reviews en pak alle parameters "score" en stop deze in een array
					var reduce = _.reduce(map, function(memo, num){ return memo + num; }, 0) / map.length; 	// Pak alle waardes uit de array en voeg deze bij elkaar tot één getal 
																											// deel dan dat getal door het aantal values die in de array stonden.
																											// memo staat voor memory (dat begint met 0). num staat voor het getal dat mee wordt gegeven uit map [Underscore.js]
					return isNaN(reduce) ? "X" : reduce; 													// Als de var reduce geen getal is (NaN) geef "X" door, anders geef het getal van variable reduce door. 
				}
			},
		
			genres: { 																						// Zorgt ervoor dat genres van films zichtbaar worden, deze zitten namelijk in een array zonder properties
				genre: { 																					// Er bestaat geen property genaamd 'genre' in de API, dus hij pakt hier mee alleen <p data-bind="genre"> uit index.html
					href: function() {																		// Maakt van de url een nette variant. 
						return "#movies/genres/" + this.value; 												// Als eerste laat hij zien: "#movies/genre/" daarna voegt hij de waarde toe waarop is geklikt. VB: #movies/genres/Drama 
					},
					text: function() {		
						return this.value; 																	// Geeft values door en zet deze in <p data-bind="genre">
					}
				}
			},
			
			description: { 																					// Maakt van description tekst html zodat de <p></p> gaat werken
				html: function() {
					return this.description;
				}
			},
			
			cover: { 																						// Maakt van url van plaatje een src, zodat de cover kan worden getoond, anders blijft deze platte tekst.
				src: function() {
					return this.cover;
				}
			}
		}
	};
})();