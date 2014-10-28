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
})();