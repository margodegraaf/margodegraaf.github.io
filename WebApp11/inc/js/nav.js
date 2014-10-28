(function() {

	// Nav
	var nav = document.getElementById("nav");					// Zoek het id "nav" uit index.html en stop deze in een gelijknamige variabele

	// Figure MobNav
	var mobNav = document.getElementById("mobNav");				// Zoek het id "mobNav" uit index.html en stop deze in een gelijknamige variabele
	var mobNavH = new Hammer(mobNav);							// Maak een nieuwe Hammer instantie op het element mobNav.

	// A href navAbout
	var navAbout = document.getElementById("navAbout");			// Zoek het id "navAbout" uit index.html en stop deze in een gelijknamige variabele
	var navAboutH = new Hammer(navAbout);						// Maak een nieuwe Hammer instantie op het element navAbout.

	// A href navMovies
	var navMovies = document.getElementById("navMovies");		// Zoek het id "navMovies" uit index.html en stop deze in een gelijknamige variabele
	var navMoviesH = new Hammer(navMovies);						// Maak een nieuwe Hammer instantie op het element navMovies.

	// Hammer
	mobNavH.on("tap click press", function() {					// Als er op mobNavH (aka mobNav) getapt, geklikt of gedrukt wordt, voer dan de loop uit.
		for(i = 0; i < mobNav.children.length; i++) {			// For loop die door gehele "mobNav" heen loopt (Twee images = index.html)
			mobNav.children[i].classList.toggle("active");		// Geef het actieve kind uit "mobNav" een toggle met CSS class "active"
		}
		nav.classList.toggle("active");							// Geef ook de nav een toggle met CSS class "active"
	});

	navAboutH.on("tap click press", function() {				// Als er op navAboutH (aka navAbout) getapt, geklikt of gedrukt wordt, voer dan de volgende functie uit
		nav.classList.remove("active");							// Verwijder de CSS class "active" op de nav
		mobNav.children[1].classList.remove("active");			// Verwijder bij het tweede kind (menu_close) van mobNav de CSS class "Active"
		mobNav.children[0].classList.add("active");				// Voeg bij het eerste kind (menu_open) van mobNac de CSS class "Active" toe
		window.location.href = navAbout.href;					// Zet de href naar anchorpoint navAbout, pagina gaat naar About (navAbout.href pakt de href="" van #navAbout.) Nodig omdat je anders lang moet indrukken.
	});

	navMoviesH.on("tap click press", function() {				// Als er op navMoviesH (aka navMovies) getapt, geklikt of gedrukt wordt, voer dan de volgende functie uit
		nav.classList.remove("active");							// Verwijder de CSS class "active" op de nav
		mobNav.children[1].classList.remove("active");			// Verwijder bij het tweede kind (menu_close) van mobNav de CSS class "Active"
		mobNav.children[0].classList.add("active");				// Voeg bij het eerste kind (menu_open) van mobNac de CSS class "Active" toe
		window.location.href = navMovies.href;					// Zet de href naar anchorpoint navMovies, pagina gaat naar Movies (navMovies.href pakt de href="" van #navMovies.)  Nodig omdat je anders lang moet indrukken.
	});
})();