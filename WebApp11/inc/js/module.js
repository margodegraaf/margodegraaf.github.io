(function() {	
	if (typeof(Storage) === "undefined")   {																// Als local storage niet mogelijk is										
		alert(JSON.stringify(movieApp.content.movies.title, null, 4));										// Geef dan de gebruiker een alert met movieApp.content.movies.title: "Sorry, er gaat iets mis"							
		console.log("Local storage is niet mogelijk");														// Feedback in console
	};

	if (typeof(Storage) !== "undefined" && localStorage.getItem('movieApp.content.movies') !== null) {		// Als local storage mogelijk is en movieApp.content.movies al gevuld is
		movieApp.content.movies = JSON.parse(localStorage.getItem('movieApp.content.movies'));				// Laat dan het object zien dat was opgeslagen in local storage
		movieApp.controller.init(); 																		// Start controller.init method => app.js
		console.log("Local storage is mogelijk en het bestond al.");										// Feedback in console
	} 
	else if (localStorage.getItem('movieApp.content.movies') === null) {									// Als local storage mogelijk is en movieApp.content.movies nog leeg is
		xhr.trigger('GET', movieApp.config.dataUrl, movieData, null); 										// Voer dan de method trigger (type, url, success, data => xhr.js) uit en de functie 'movieData'.	
		console.log("Local storage is mogelijk en het is toegevoegd.");										// Feedback in console 
	};
	
	function movieData(loadData) {																			// Functie die content uit API toevoegd aan movieApp.content.movies
		movieApp.content.movies = JSON.parse(loadData);														// Content die in movieApp.content.movies zit in loadData variabele stoppen als JSON object.
		localStorage.setItem('movieApp.content.movies', loadData);											// Sla de text loadData op in movieApp.content.movies en zet deze in local storage.
		movieApp.controller.init();																			// Start controller.init method => app.js
	};
}());
