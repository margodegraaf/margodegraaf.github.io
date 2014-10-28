/* XHR
Deze onderstaande object literal zorgt voor een gemakkelijke manier om informatie van een URL/Server op te halen zonder de pagina te herladen. */

var xhr = {
	trigger: function (type, url, success, data) {					// De method trigger met de parameters: type(GET/POST), url(waar vandaan), succes(functie starten), data(posten naar een server)
		var req = new XMLHttpRequest;	 							// Variabele genaamd req met een nieuw XMLHttpRequest 
		req.open(type, url, true);			 						// GET, movieApp.config.dataUrl, true (asynchronously) => afkomstig uit module.js

		req.setRequestHeader('Content-type','application/json');	// Voegt HTTP headers toe aan request (deze geven informatie door aan de client browser, de opgevraagde pagina, de server etc.
																	// Content-type: specifeert de header name, application/json: specifeert de header value.

		type === 'POST' ? req.send(data) : req.send(null);			// Als type gelijk is aan post, verstuur dan (data), zo niet verstuur (null).

		var loader = document.getElementById("loader");				// Zoek het element met ID "loader" => index.html
		req.onload = loader.style.display = "block";				// Als de XMLHttpRequest aan het laden is, geef dan de loader een display:block

		req.onreadystatechange = function() {						// Functie om te kijken hoe de readyState er voor staat.
			if (req.readyState === 4) {								// 4: request is klaar.
				loader.style.display = "none";						// Geef loader weer een display:none, nadat het inladen in voltooid.
				if (req.status === 200 || req.status === 201) { 	// Als req.status gelijk is aan 200 of 201 voer dan...
					success(req.responseText);						// ...de functie succes uit en krijg met responseText de response data in een string mee.
				}
			}
		}
	}
};
