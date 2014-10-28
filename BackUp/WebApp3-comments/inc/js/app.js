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
				// Als er op een specifieke film is gedrukt
				"movies/:id": function(id) {
					movieApp.sections.toggle("movies", id)	
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
		// Welke section moet actief worden + is er een tweede parameter (filter) doorgestuurd? 
		// Bij movies is dat 'id', bij genres wordt dat 'genre' (of iets dergelijks), hierdoor kunnen we movies/:id - genres/:genre paginas maken
		toggle: function(section, filter) {
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
			console.log(filter);
			
			// Als de doorgestuurde section, "about" is.
			if(section === "about") {
				// Activeer transparency.js in <section id="about"> met de gegevens van movieApp.content.about + Directives om text te injecteren op specifieke manier waar nodig.
				Transparency.render(document.getElementById(section), movieApp.content.about, movieApp.content.directives);
			}
			// Als de doorgestuurde section, "movies" is.
			else if(section === "movies") {
				// Als de doorgestuurde filter leeg is (dus er is in de hoofdnavigatie gedrukt)
				if( !filter ) {
					// Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.about + Directives om text te injecteren op specifieke manier waar nodig.
					Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives);
				}
				
				// Als de doorgestuurde parameter gevuld is (dus er is op ID van film gedrukt)
				/* 
					NOTE: Dit moeten we waarschijnlijk in een andere if/else doen als we van detail pagina een aparte pagina willen maken
					Detailpagina gaat dan namelijk in een andere <section>, omdat daarin andere gegevens getoond moeten worden.
					In plaats ID kunnen we de genre filter hier gebruiken (dan heb je: if(!filter){overzicht van alle films}, else{overzicht van drama-films} )
					Dit komt zaterdag :-)
				*/
				else {
					// Activeer transparency.js in <section id="movies"> met de gegevens van movieApp.content.about met de gegevens van de meegestuurde ID + Directives om text te injecteren op specifieke manier waar nodig.
					// parseInt wordt gebruikt om zeker te weten dat er alleen een getal wordt doorgestuurd.
					Transparency.render(document.getElementById(section), _.where(movieApp.content.movies, {id: parseInt(filter)}), movieApp.content.directives);
				}
			}
		}
	};
})();

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