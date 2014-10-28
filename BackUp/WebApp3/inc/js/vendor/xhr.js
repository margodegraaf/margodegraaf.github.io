/* XHR
Deze onderstaande object literal zorgt voor een gemakkelijke manier om informatie van een URL/Server op te halen zonder de pagina te herladen. */

var xhr = {
	trigger: function (type, url, success, data) {					// De method trigger met de parameters: type(GET/POST), url(waar?), succes(functie?), data(posten?)
		var req = new XMLHttpRequest;	 							// Variabele genaamd req met daarna een nieuw XMLHttpRequest object
		req.open(type, url, true);			 						// GET, movieApp.config.dataUrl, true (asynchronously) => module.js

		req.setRequestHeader('Content-type','application/json');	// Voegt HTTP headers toe aan request (deze geven informatie door aan de client browser, de opgevraagde pagina, de server etc. 
																	// Content-type: specifeert de header name, application/json: specifeert de header value.
 
		type === 'POST' ? req.send(data) : req.send(null);			// Als type gelijk is aan post, verstuurt dan (data), zo niet verstuur (null).

		req.onreadystatechange = function() {						// Slaat een functie op die elke keer word opgeroepen als de readyState property veranderd.
			if (req.readyState === 4) {								// 4: request is klaar en ready.
				if (req.status === 200 || req.status === 201) { 	// 200 betekent "OK", als je 201 ziet dan weet je dat het ergens niet goed gaat.
					success(req.responseText);						// Met responseText krijg je de response data in een string van de server.
				}
			}
		}
	}
};

// VRAAG: hoezo POST en niet GET?