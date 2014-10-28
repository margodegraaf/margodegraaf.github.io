(function() {
	/* CONTROLLER
	- Method genaamd "init" roept methode "init" aan uit movieApp.router */
	movieApp.controller = {
		init: function() {
			movieApp.router.init();
		}
	};
	
	/* CONFIG 
	- Property met url naar API */
	movieApp.config =  {
		dataUrl: "http://dennistel.nl/movies"
	};
	
	/* ROUTER
	- Method genaamd "init" met Routie object. 
	- Routie is een javascript routing libary; een verzameling functies en methodes; die kijkt door middel van hashtekens naar het pad wat de gebruiker opvraagt en toont daarna de juiste content.
	- Methods "about" en "movies" roepen toggle method aan in movieApp.sections (word aangeroepen door klik in hoofdnavigatie)
	- "movies/:subPage/:argument" = Geeft variabele "subPage" en "argument" door als parameters naar toggle method in movieApp.sections.
	- * zorgt ervoor dat de gebruiker nooit een lege pagina krijgt. */
	movieApp.router = {
		init: function() {	
			routie({
				"about": function() {
					movieApp.sections.toggle("about");
				},
				"movies": function() {
					movieApp.sections.toggle("movies");
				},
				"movies/:subPage/:argument": function(subPage, argument) {
					movieApp.sections.toggle("movies", subPage, argument)	
				},
			    "*": function() {
			    	movieApp.sections.toggle("about");
			    }
			});
		}
	};
	
	/* SECTIONS */
	movieApp.sections = {
		// Met toggle regel ik welke section actief moet worden en controleer ik of er een subPage/argument wordt meegestuurd.
		// Bij movies wordt argument de 'id', bij genres wordt dat 'genre', hierdoor kunnen we movies/:id - genres/:genre paginas maken
		toggle: function(section, subPage, argument) {
			// Selecteer alle <section> 
			var selector = document.querySelectorAll("section");
			
			// For loop die door alle <section> heen loopt
			for (var i = 0; i < selector.length; i++) { 
				// Verwijder bij alle <section> de CSS class "active"
				selector[i].classList.remove("active");	
			}
			
			// Voeg CSS class "active" toe aan <section> dat doorgestuurd is
			document.getElementById(section).classList.add("active");
			
			/* TEST: Laat zien welke parameters "filter" doorstuurd.
			console.log(subPage);
			console.log(argument);
			*/
			
			// Als de doorgestuurde <section> "about" is...
			if(section === "about") {
				// ...activeer transparency.js in <section id="about"> met de gegevens van movieApp.content.about + Directives om tekst te injecteren op specifieke manier waar nodig is.
				Transparency.render(document.getElementById(section), movieApp.content.about, movieApp.content.directives);
			}
			// Als de doorgestuurde <section> "movies" is dan zijn er drie opties:
			else if(section === "movies") {
				
				// NUMMER 1: Als de doorgestuurde subPage leeg is (dus er is in de hoofdnavigatie gedrukt)
				if( !subPage ) {
					// Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.movies + Directives om tekst te injecteren op specifieke manier waar nodig.
					Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives);
				}
				
				// NUMMER 2: Als er een subPage doorgestuurd is en deze subPagina 'detail' is
				else if( subPage === "detail") {
					
					// De variable detail word een object door _.where functie
					// De _.where functie zoekt in movieApp.content.movies naar objecten waarin de gegevens van de meegestuurde ID (argument) voorkomen
					// parseInt wordt gebruikt om zeker te weten dat er alleen een getal wordt doorgestuurd.
					var detail = _.where(movieApp.content.movies, {id: parseInt(argument)});	
					
					// Activeer transparency.js in <section id="movies"> met de gegevens van variabele detail + Directives om tekst te injecteren op specifieke manier waar nodig.
					Transparency.render(document.getElementById(section), detail, movieApp.content.directives);
					
					// Laat naast <section id="movies"> ook <section id="detail" zien, zodat er meer gegevens over deze film getoond kan worden. 
					document.getElementById("detail").classList.add("active");
				}
				
				//  NUMMER 3: Als er een subPage doorgestuurd is en deze subPagina 'genres' is
				else if( subPage === "genres") {
					
					// De variable genre wordt object door _.filter functie
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
					
					// Activeer transparency.js in <section id="movies"> met de gegevens van de variable (object) genre + Directives om tekst te injecteren op specifieke manier waar nodig.
					Transparency.render(document.getElementById(section), genre, movieApp.content.directives);
				}
			}
		}
	};
})();