(function() {
	
	// Als local storage niet mogelijk is
	if (typeof(Storage) == "undefined")   {																// Hoe kan ik dit testen?
		alert(JSON.stringify(movieApp.content.movies.title, null, 4));									// Kunnen we dit in HTML omzetten? Zo ja, dan kunnen we ook andere content laten zien. (.title => anders zie je object)
		console.log("Local storage is niet mogelijk");
	};
	
	// Als local storage mogelijk is en movieApp.content.movies al gevuld is
	if (typeof(Storage) !== "undefined" && localStorage.getItem('movieApp.content.movies') !== null) {
		movieApp.content.movies = JSON.parse(localStorage.getItem('movieApp.content.movies'));														
		movieApp.controller.init();
		console.log("Local storage is mogelijk en het bestond al.");	
	} 	
	// Als local storage mogelijk is en movieApp.content.movies nog leeg is
	else if (localStorage.getItem('movieApp.content.movies') == null) {
		xhr.trigger('GET', movieApp.config.dataUrl, movieData, null); 									// Moet gebruiker wel internet hebben! Anders ziet hij/zij als nog niets.										
		console.log("Local storage is mogelijk en het is toegevoegd.");
	};
	
	// Functie die content uit API toevoegd aan movieApp.content.movies
	function movieData(loadData) {																			
		movieApp.content.movies = JSON.parse(loadData);																				
		localStorage.setItem('movieApp.content.movies', loadData);											
		movieApp.controller.init();																		
	}; 	
	
	

	


	
	
	
	/* BACK UP MAIKEN
	// SUCCES
	if (typeof(Storage) !== "undefined" && localStorage.getItem('movieApp.content.movies') !== null) {		// Check of local storage mogelijk is in de browser EN localStorage.getItem('movieApp.content.movies' gevuld?
		movieApp.content.movies = JSON.parse(localStorage.getItem('movieApp.content.movies'));				// Zo ja, laat dan het object zien dat was opgeslagen in local storage. Conventeert wel eerst de JSON text naar Javascript object (JSON.parse(text).

		console.log("Local storage is gelukt of bestond al.");												// Feedback in console (succes).
		movieApp.controller.init();																			// Start controller.init method => app.js

	// FAIL	
	} else if(typeof(Storage) == "undefined" || localStorage.getItem('movieApp.content.movies') == null) {	// ALs Local storage niet mogelijk is in de browser OF localStorage.getItem('movieApp.content.movies' is leeg?
		alert(JSON.stringify(movieApp.content.movies.title, null, 4));
		
	
		//console.log(movieApp.content.movies);
		console.log("Try");
			
		//xhr.trigger('GET', movieApp.config.dataUrl, movieData, null); 										// Voer dan de method trigger (type, url, success, data => xhr.js) uit en de functie 'movieData'.						
		//console.log("Local storage is mislukt en toegevoegd.");												// Feedback in console (fail).
	};

	function movieData(loadData) {																			// Functie genaamd 'movieData' met parameter 'loadData'.
		movieApp.content.movies = JSON.parse(loadData);														// Content die in movieApp.content.movies zit in loadData variabele stoppen als JSON text.
		console.log(movieApp.content.movies); 						

		localStorage.setItem('movieApp.content.movies', loadData);											// Sla de text loadData op in movieApp.content.movies en zet deze in local storage.
		movieApp.controller.init();																			// Start controller.init method => app.js
	};
	*/	
}()); 