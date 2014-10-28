// Self invoking anonymous function
(function() {

	/* CONTROLLER
	- Object literal.
	- Method genaamd "init".
	- Twee methods aanroepen uit verschillende objecten. */
	movieApp.controller = {
		init: function() {
			movieApp.router.init();
			// movieApp.sections.init(); // Bestaat niet meer, is niet meer nodig
		}
	};
	
	/* CONFIG 
	- Object literal
	- Property met url naar API	*/
	movieApp.config =  {
		dataUrl: "http://dennistel.nl/movies"
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
				// Als er op de about knop is gedrukt in hoofdnavigatie
				"about": function() {
					movieApp.sections.toggle("about");
				},
				// Als er op de movies knop is gedrukt in hoofdnavigatie
				"movies": function() {
					movieApp.sections.toggle("movies");
				},
				// Als er zowel een subpagina als argument is doorgestuurd in de link
				// :subPage en :argument zijn variabelen (komt uit routie.js library)
				// Voor elke variabele worden er in de functie paramemeters meegegeven
				"movies/:subPage/:argument": function(subPage, argument) {
					// Stuurt "movies" en de variabelen van routie door naar de toggle method
					movieApp.sections.toggle("movies", subPage, argument)	
				},
				
			    "*": function() {
			    	movieApp.sections.toggle("about");
			    }
			});
		}
	};
	
	/* SECTIONS
	- Object literal.
	- Method "init", "about", "movies" en "toggle".
	- Transparency (Semantische template engine voor browsers. Zorgt ervoor dat de data in het content object wordt ingeladen/gerendert in de juiste section door middel van een ID.)
	- Variabele genaamd selector. (local scope)
	- For loop haalt eerst CSS class "active" weg met "classList.remove", checkt daarna welke parameter oftewel section hij door krijgt en voegt dan weer de CSS class active aan toe door middel van "classList.add". */
	movieApp.sections = {
		// Welke section moet actief worden + is er een tweede en derde parameter (subPage/Argument) doorgestuurd? 
		// Bij movies wordt arguement de 'id', bij genres wordt dat 'genre', hierdoor kunnen we movies/:id - genres/:genre paginas maken
		toggle: function(section, subPage, argument) {
			// Selecteer alle <section>
			var selector = document.querySelectorAll("section");
			
			// Maak for loop dat door gaat t/m aantal <section> in het document
			for (var i = 0; i < selector.length; i++) { 
				// Verwijder van alle <section> de class "active"
				selector[i].classList.remove("active");
			}
			
			// Voeg class "active" toe aan <section> dat doorgestuurd is
			document.getElementById(section).classList.add("active");
			
			// Test: kijken wat hij doorstuurd qua parameter 'filter'
			console.log(subPage);
			console.log(argument);
			
			// Als de doorgestuurde section, "about" is.
			if(section === "about") {
				// Activeer transparency.js in <section id="about"> met de gegevens van movieApp.content.about + Directives om text te injecteren op specifieke manier waar nodig.
				Transparency.render(document.getElementById(section), movieApp.content.about, movieApp.content.directives);
			}
			// Als de doorgestuurde section, "movies" is.
			else if(section === "movies") {
				// Als de doorgestuurde subPage leeg is (dus er is in de hoofdnavigatie gedrukt)
				if( !subPage ) {
					// Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.movies + Directives om text te injecteren op specifieke manier waar nodig.
					Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives);
				}
				
				// Als er een subPage doorgestuurd is en deze subPagina 'detail' is
				else if( subPage === "detail") {
					
					// Een variable detail dat een object wordt dankzij de underscore.js _.where functie
					// De _.where functie zoekt in movieApp.content.movies naar objecten waarin de gegevens van de meegestuurde ID (argument) voorkomen
					// parseInt wordt gebruikt om zeker te weten dat er alleen een getal wordt doorgestuurd.
					var detail = _.where(movieApp.content.movies, {id: parseInt(argument)});	
					
					// Activeer transparency.js in <section id="movies"> met de gegevens van variabele detail + Directives
					Transparency.render(document.getElementById(section), detail, movieApp.content.directives);
					
					// Laat naast <section id="movies"> ook <section id="detail" zien, zodat er meer gegevens over deze film getoond kan worden.
					document.getElementById("detail").classList.add("active");
				}
				
				// Als er een subPage doorgestuurd is en deze subPagina 'genres' is
				else if( subPage === "genres") {
					
					// Een variable genre dat een object wordt dankzij de underscore.js _.filter functie
					// Deze variabele (object) wordt later in de transparency render geplaatst.
					// Maak via underscore.js een _.filter aan om movieApp.content.movies als basis object (obj) te gebruiken
					var genre = _.filter(movieApp.content.movies, function(obj) {
						// Een for loop dat alle obj.genres (movieApp.content.movies.genres) arrays langs gaat
						for(i=0; i < obj.genres.length; i++) {
							// Als de waarde van obj.genres[GETAL] gelijk is aan de waarde van de doorgestuude argument (bijvoorbeeld: Drama)
							if(obj.genres[i] == argument) { 
								// return dit object.
								// Uiteindelijk zorgt de _.filter functie er voor dat er een globale object komt waarin de gevonden objecten.
								return obj.genres[i] 
							}
						}
					});
					
					// Activeer transparency.js in <section id="movies"> met de gegevens van de variable (object) genre + Directives
					Transparency.render(document.getElementById(section), genre, movieApp.content.directives);
				}
			}
		}
	};
})();

/* BEWAREN:
Routie object voordat we twee variabelen apart doorstuurden

	"movies/detail/:id": function(id) {
		movieApp.sections.toggle("movies", "detail", id)	
	},
	"movies/genres/:genre": function(genre) {
		movieApp.sections.toggle("movies", "genre", genre)	
	},
	
Dieper genestte objecten voor subpage
	//Een werkend voorbeeld van dieper genestte objecten:
	// Maak via underscore.js een _.filter aan om movieApp.content.movies als basis object (obj) te gebruiken
	var genre = _.filter(movieApp.content.movies, function(obj) {
		// Gebruik via underscore.js de _.where functie om binnen het object.actors (movieApp.content.movies.actors) te zoeken naar actor_names met "Al Pacino"
		// End de lengte van de array groter is dan 0.
		return _.where(obj.actors, {actor_name: "Al Pacino"}).length > 0;
	});
*/

/* BEWAREN;
Stond in movieApp.sections {};

init: function() {
	//this.about();
	//this.movies();
},
about: function() {
	Transparency.render(document.getElementById("about"), movieApp.content.about, movieApp.content.directives);
},
movies: function() {
	
	//Transparency.render(document.getElementById("movies"), _.where(movieApp.content.movies, {id: 3}), movieApp.content.directives);
	Transparency.render(document.getElementById("movies"), movieApp.content.movies, movieApp.content.directives);
},*/



/* ITERATIES subPage === Genres: 

// Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.about met de gegevens van de meegestuurde ID + Directives om text te injecteren op specifieke manier waar nodig.
// parseInt wordt gebruikt om zeker te weten dat er alleen een getal wordt doorgestuurd.

// Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives);
// Transparency.render(document.getElementById(section), _.where(movieApp.content.movies, {release_date: "14 October 1994"}), movieApp.content.directives);


//var bla = _.where(movieApp.content.movies, {actor_name: "Al Pacino"});

/*var bla = _.filter(movieApp.content.movies, function(genres){
	return _.contains(genres, "Crime");
});*/

/* var arr = _.pluck(movieApp.content.movies, "genres");
					var sum = _.reduce(arr, function(memo, num){ return memo + "Crime"; }, 0);
					var joep = _.where(movieApp.content.movies, {genres: "Crime"}); */
					
					/* var bla = _.pluck( _.filter(movieApp.content.movies, function(show) {
						return show.id;
					}) ); */