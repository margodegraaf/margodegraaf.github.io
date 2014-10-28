/* Namespace (global scope)
Het content.js bestand wordt als eerste ingeladen van mijn zelfgemaakte codes. */
var movieApp = movieApp || {};

// Self invoking anonymous function
(function() {
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
			// Geeft id door aan ??argument??, anders krijg je default route. !! CONTROLEREN !!
			title: {
				href: function() { 
					return "#movies/detail/" + this.id + "/" + this.title.toLowerCase().replace(/\ /g,'-');
				}
			},
			// Maakt een gemiddelde score van alle review cijfers
			score: {
				text: function() {
					// Ga naar movieApp.movies.reviews en pak alle parameters "score" en stop deze in een array
					var map = _.pluck(this.reviews, "score").map(function (value){ return value });

					// Pak alle waardes uit de array en voeg deze bij elkaar tot 1 getal en deel dan dat getal door het aantal values die in de array stonden.
					// memo staat voor memory (dat begint met 0). num staat voor het getal dat mee wordt gegeven uit map [Underscore.js]
					var reduce = _.reduce(map, function(memo, num){ return memo + num; }, 0) / map.length;

					// Als de var reduce geen getal is (NaN) geef "Geen reviews" door, anders geef het getal van variable reduce door. (Fight Club heeft namelijk geen reviews)
					return isNaN(reduce) ? "Geen reviews" : reduce;
				}
			},
			// Zorgt ervoor dat genres van films zichtbaar worden, deze zitten namelijk in een array zonder properties
			genres: {
				// Er bestaat geen property genaamd 'genre' in de API, dus hij pakt hier mee alleen <p data-bind="genre"> uit index.html
				genre: {
					href: function() {
						// Geeft genre door als ??argument??, anders krijg je default route. !! CONTROLEREN !!
						return "#movies/genres/" + this.value;
					},
					text: function() {
						// Geeft values door en zet deze in <p data-bind="genre">
						return this.value;
					}
				}
			},
			// Maakt van description tekst html zodat de <p></p> gaat werken
			description: {
				html: function() {
					return this.description;
				}
			},
			// Maakt van url van plaatje een src, zodat de cover kan worden getoond, anders blijft deze platte tekst.
			cover: {
				src: function() {
					return this.cover;
				}
			}
		}
	};
})();