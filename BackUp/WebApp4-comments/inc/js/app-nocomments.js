(function() {
	movieApp.controller = {
		init: function() {
			movieApp.router.init();
		}
	};
	
	movieApp.config =  {
		dataUrl: "http://dennistel.nl/movies"
	};
	
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
	
	movieApp.sections = {
		toggle: function(section, subPage, argument) {
			var selector = document.querySelectorAll("section");
			
			for (var i = 0; i < selector.length; i++) { 
				selector[i].classList.remove("active");
			}
			
			document.getElementById(section).classList.add("active");
			
			if(section === "about") {
				Transparency.render(document.getElementById(section), movieApp.content.about, movieApp.content.directives);
			}
			else if(section === "movies") {
				if( !subPage ) {
					Transparency.render(document.getElementById(section), movieApp.content.movies, movieApp.content.directives);
				}
				else if( subPage === "detail") {
					var detail = _.where(movieApp.content.movies, {id: parseInt(argument)});	
					
					Transparency.render(document.getElementById(section), detail, movieApp.content.directives);
					
					document.getElementById("detail").classList.add("active");
				}
				else if( subPage === "genres") {
					var genre = _.filter(movieApp.content.movies, function(obj) {
						for(i=0; i < obj.genres.length; i++) {
							if(obj.genres[i] == argument) { 
								return obj.genres[i] 
							}
						}
					});
					
					Transparency.render(document.getElementById(section), genre, movieApp.content.directives);
				}
			}
		}
	};
})();