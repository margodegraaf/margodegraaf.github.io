(function() {
	// CONTROLLER
	movieApp.controller = {
		init: function() {
			movieApp.router.init();																// Method genaamd "init" roept methode "init" aan uit movieApp.router
		}
	};

	// CONFIG
	movieApp.config =  {
		dataUrl: "http://dennistel.nl/movies"													// Property met url naar API
	};

	// ROUTER
	movieApp.router = {
		init: function() {																		// Method genaamd "init" met Routie object.
			routie({																			// Routie = routing libary; die kijkt door middel van hashtekens naar het pad wat wordt opgevraagd en toont daarna de juiste content.
				"about": function() {
					movieApp.sections.toggle("about");											// Methods "about" roept toggle method aan in movieApp.sections (word aangeroepen door klik in hoofdnavigatie)
				},
				"movies": function() {
					movieApp.sections.toggle("movies");											// Methods "movies" roept toggle method aan in movieApp.sections (word aangeroepen door klik in hoofdnavigatie)
				},
				"movies/genres/:argument": function(argument) {
					movieApp.sections.toggle("movies", "genres", argument);						// "movies/genres/:argument" = Geeft het volgende door: "movies", "genres" "argument (waarop geklikt is)" aan de toggle method.
				},
				"movies/detail/:argument/*": function(argument) {
					movieApp.sections.toggle("movies", "detail", argument);						// "movies/detail/:argument" = Geeft het volgende door: "movies", "detail" "argument (waarop geklikt is)" aan de toggle method.
				},
			    "*": function() {
			    	movieApp.sections.toggle("about");											// * zorgt ervoor dat de gebruiker nooit een lege pagina krijgt.
			    }
			});
		}
	};

	// SECTIONS
	movieApp.sections = {
		toggle: function(section, subPage, argument) {											/* Met toggle regel ik welke section actief moet worden en controleer ik of er een subPage/argument wordt meegestuurd.
																								   Bij movies wordt argument de 'id', bij genres wordt dat 'genre', hierdoor kunnen we movies/:id - genres/:genre paginas maken */
			var pageTitle = document.getElementById("pageTitle");								// Selecteer het id pageTitle uit index.html
			var selector = document.querySelectorAll("section");								// Selecteer alle <section>

			for (i = 0; i < selector.length; i++) {												// For loop die door alle <section> heen loopt
				selector[i].classList.remove("active");											// Verwijder bij alle <section> de CSS class "active"
				selector[i].classList.remove("detail"); 										// Verwijder bij alle <section> de CSS class "detail"
			}
			document.getElementById(section).classList.add("active");							// Voeg CSS class "active" toe aan <section> dat doorgestuurd is

			function simplePlot(status) {														// Functie genaamd "simplePlot" zorgt ervoor dat de simpePlot wel of niet getoond worden waar het hoort.
				var simplePlot = document.querySelectorAll(".simplePlot"); 						// Pak alle elementen met de class simplePlot en zet deze in variabele

				for (i = 0; i < simplePlot.length; i++) {										// For loop gaat alle .simplePlot in de index.html langs
					if(status === "add") {														// Als het getoond moet worden moet de parameter 'status' gelijk zijn aan 'add'
						simplePlot[i].classList.add("active");									// Geef ze CSS class active mee
					}
					else if(status === "remove") {												// Als het niet getoond moet worden moet de parameter 'status' gelijk zijn aan 'remove'
						simplePlot[i].classList.remove("active");								// Verwijder de CSS class active
					}
				}
			}


			// SECTIONS - ABOUT
			if(section === "about") {															// Als de doorgestuurde <section> "about" is...
				pageTitle.classList.remove("active");											// Verwijder pageTitle de CSS class active

				Transparency.render(document.getElementById(section), movieApp.content.about, movieApp.content.directives); /* ...activeer transparency.js in <section id="about"> met de gegevens van movieApp.content.about
																															   Directives om tekst te injecteren op specifieke manier waar nodig is */
			}
			// SECTIONS - MOVIES
			else if(section === "movies") {														// Als de doorgestuurde <section> "movies" is dan zijn er drie opties:
				if( !subPage ) {																// NUMMER 1: Als de doorgestuurde subPage leeg is (dus er is in de hoofdnavigatie gedrukt)
					pageTitle.classList.add("active"); 											// Geef pageTitle de CSS class active mee
					pageTitle.innerHTML = "Movies";												// en zet in het element de volgende html tekst neer: Movies

					Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives) /* Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.movies
																																   Directives om tekst te injecteren op specifieke manier waar nodig. */
					simplePlot("add");															// Laat de .simplePlot zien op de movies pagina
				}
				// SECTIONS - DETAIL
				else if( subPage === "detail") { 												// NUMMER 2: Als er een subPage doorgestuurd is en deze subPagina 'detail' is
					var detail = _.where(movieApp.content.movies, {id: parseInt(argument)});	// De variable detail word een object door _.where functie
																								// De _.where functie zoekt in movieApp.content.movies naar objecten waarin de gegevens van de meegestuurde ID (argument) voorkomen
																								// parseInt wordt gebruikt om zeker te weten dat er alleen een getal wordt doorgestuurd.
					pageTitle.classList.remove("active"); 										// Verwijder bij de pageTitle de CSS class active

					Transparency.render(document.getElementById(section), detail, movieApp.content.directives); /* Activeer transparency.js in <section id="movies"> met de gegevens van variabele detail
																												   Directives om tekst te injecteren op specifieke manier waar nodig.*/
					document.getElementById("detail").classList.add("active");					// Laat naast <section id="movies"> ook <section id="detail" zien, zodat er meer gegevens over deze film getoond kan worden.
					document.getElementById(section).classList.add("detail");

					simplePlot("remove");														// Laat de .simplePlot niet zien op de detailpagina
				}
				// SECTIONS - GENRES
				else if( subPage === "genres") {												//  NUMMER 3: Als er een subPage doorgestuurd is en deze subPagina 'genres' is
					var genre = _.filter(movieApp.content.movies, function(obj) {				/* De variable genre wordt object door _.filter functie. Deze variabele (object) wordt later in de transparency render geplaatst.
																								Maak via underscore.js een _.filter aan om movieApp.content.movies als basis object (obj) te gebruiken */
						for(i = 0; i < obj.genres.length; i++) { 								// Een for loop dat alle obj.genres (movieApp.content.movies.genres) arrays langs gaat
							if(obj.genres[i] === argument) { 									// Als de waarde van obj.genres[GETAL] gelijk is aan de waarde van de doorgestuude argument (bijvoorbeeld: Drama)
								return obj.genres[i]; 											// return dit object. Uiteindelijk zorgt de _.filter functie er voor dat er een globale object komt waarin de gevonden objecten.
							}
						}
					});

					pageTitle.classList.add("active"); 											// Geef pageTitle de CSS class active mee
					pageTitle.innerHTML = "Genre: " + argument; 								// en zet in het element de volgende html tekst neer: Genre: argument(bvb Horror)

					Transparency.render(document.getElementById(section), genre, movieApp.content.directives);	/* Activeer transparency.js in <section id="movies"> met de gegevens van de variable (object) genre +
																												   Directives om tekst te injecteren op specifieke manier waar nodig. */
					simplePlot("add");															// Laat de .simplePlot zien op de genre pagina
				}
			}
			window.scrollTo(0,0); 																// Scroll altijd weer naar boven van de pagina nadat er op een link is geklikt
		}
	};
})();