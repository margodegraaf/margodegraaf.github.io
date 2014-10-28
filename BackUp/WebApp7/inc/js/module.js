(function() {

	// SUCCES
	if (typeof(Storage) !== "undefined" && localStorage.getItem('movieApp.content.movies') !== null) {		// Check of local storage mogelijk is in de browser EN localStorage.getItem('movieApp.content.movies' gevuld?
		movieApp.content.movies = JSON.parse(localStorage.getItem('movieApp.content.movies'));				// Zo ja, laat dan het object zien dat was opgeslagen in local storage. Conventeert wel eerst de JSON text naar Javascript object (JSON.parse(text).

		console.log("Local storage is gelukt of bestond al.");												// Feedback in console (succes).
		movieApp.controller.init();																			// Start controller.init method => app.js

	// FAIL	
	} else if(typeof(Storage) == "undefined" || localStorage.getItem('movieApp.content.movies') == null) {	// ALs Local storage niet mogelijk is in de browser OF localStorage.getItem('movieApp.content.movies' is leeg?
		xhr.trigger('GET', movieApp.config.dataUrl, movieData, null); 										// Voer dan de method trigger (type, url, success, data => xhr.js) uit en de functie 'movieData'.
																											
		console.log("Local storage is mislukt en toegevoegd.");												// Feedback in console (fail).
	}

	function movieData(loadData) {																			// Functie genaamd 'movieData' met parameter 'loadData'.
		movieApp.content.movies = JSON.parse(loadData);														// Content die in movieApp.content.movies zit in loadData variabele stoppen als JSON text.
		console.log(movieApp.content.movies); 						

		localStorage.setItem('movieApp.content.movies', loadData);											// Sla de text loadData op in movieApp.content.movies en zet deze in local storage.
		movieApp.controller.init();																			// Start controller.init method => app.js
	};
}()); 