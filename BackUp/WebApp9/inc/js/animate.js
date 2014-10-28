(function() {

	// Mobiele navigatie
	var mobNav = document.getElementById("mobNav");
	var mobNavH = new Hammer(mobNav);
	
	var nav = document.getElementById("nav");
	var navH = new Hammer(nav);

	mobNavH.on("tap", function() {
		for(i = 0; i < mobNav.children.length; i++) {
			mobNav.children[i].classList.toggle("active");
		}

		nav.classList.toggle("active");
		
		navH.on("tap", function() {										// Deze moet click zijn in emulation in Chrome anders doet hij het niet. Even op echte  mobiel testen!
			nav.classList.remove("active");
			mobNav.children[1].classList.remove("active");
			mobNav.children[0].classList.add("active");
		});
	});
	

	// Page swipe
	var aboutPage = document.getElementById("about");
	var aboutH = new Hammer(aboutPage);
	
	var moviePage = document.getElementById("movies");	
	var movieH = new Hammer(moviePage);
	
	aboutH.on("panleft", function() {
		window.location.href = "#movies";
	});
	
	movieH.on("panright", function() {
		window.location.href = "#about";
	});
	
})();
