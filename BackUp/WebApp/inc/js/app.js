// Namespace (global scope)
var movieApp = movieApp || {};

// Self invoking anonymous function
(function() {

	/* CONTROLLER
	- Object literal.
	- Method genaamd "init".
	- Twee methods aanroepen uit verschillende objecten. */
	movieApp.controller = {
		init: function() {
			movieApp.router.init();
			movieApp.sections.init();	
		}
	};
	
	/* ROUTER
	- Object literal.
	- Method genaamd "init".
	- Routie object. (Routie is een javascript routing libary; een verzameling functies en methodes; die kijkt door middel van hashtekens naar het pad wat de gebruiker opvraagt en toont daarna de juiste content.)
	- Twee properties genaamd "about" en "movies". 
	- * zorgt ervoor dat de gebruiker nooit een lege pagina krijgt. */
	movieApp.router = {
		init: function() {	
			routie({
				about: function() {
					movieApp.sections.toggle("about");
				},
				movies: function() {
					movieApp.sections.toggle("movies");
				},
			    "*": function() {
			    	movieApp.sections.toggle("about");
			    }
			});
		}
	};
	
	/* CONTENT
	- Object literals.
	- Array genaamd "overzicht" met daarin vier object literals.
	- HTML content.
	- De method genaamd html zorgt ervoor dat de <p> </p> gaan werken in description van het about object.
	- De method src zorgt ervoor dat de cover afbeeldingen getoond worden.
	- this. refereert naar object dat de method aanroept.
	- return functie zal stoppen na geeft waarde (value) terug aan hetgeen wat het aanroepte.  */
	movieApp.content = {
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
		movies: {
			title: "Favorite movies",
			overview: [{
				title: "Shawshank Redemption",
				releaseDate: "14 October 1994",
				description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
				cover: "inc/img/shawshank-redemption.jpg"
			}, {
				title: "The Godfather",
				releaseDate: "24 March 1972",
				description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
				cover: "inc/img/the-godfather.jpg"
			}, {
				title: "Pulp Fiction",
				releaseDate: "14 October 1994",
				description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
				cover: "inc/img/pulp-fiction.jpg"
			},{
				title: "The Dark Knight",
				releaseDate: "18 July 2008",
				description: "When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.",
				cover: "inc/img/the-dark-knight.jpg"
			}]
		},
		directives: {
			description: {
				html: function(params) {
					return params.value + this.description;
				}
			},
			overview: { 
				cover: {
					src: function() {
						return this.cover;
					}
				}	
			}
		}
	};
		
	/* SECTIONS
	- Object literal.
	- Method "init", "about", "movies" en "toggle".
	- Transparency (Semantische template engine voor browsers. Zorgt ervoor dat de data in het content object wordt ingeladen/gerendert in de juiste section door middel van een ID.)
	- Variabele genaamd selector. (local scope)
	- For loop haalt eerst CSS class "active" weg met "classList.remove", checkt daarna welke parameter oftewel section hij door krijgt en voegt dan weer de CSS class active aan toe door middel van "classList.add". */
	movieApp.sections = {
		init: function() {
			this.about();
			this.movies();
		},
		about: function() {
			Transparency.render(document.getElementById("about"), movieApp.content.about, movieApp.content.directives);
		},
		movies: function() {
			Transparency.render(document.getElementById("movies"), movieApp.content.movies, movieApp.content.directives);
		},
		toggle: function(section) {
			var selector = document.querySelectorAll("section");

			for (var i = 0; i < selector.length; i++) { 
				selector[i].classList.remove("active");
				}
				
				document.getElementById(section).classList.add("active");
		}
	};

// Start de functie 'init' uit het object 'movieApp.controller'.
movieApp.controller.init();
})();