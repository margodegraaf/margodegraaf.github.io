(function() {
	/*
		Mobiele navigatie
	*/
	var mobileNav = document.getElementById('mobileNav');
	var nav = document.getElementById('nav');

	var mobileH = new Hammer(mobileNav);
	var navH = new Hammer(nav);

	mobileH.on("tap", function() {
		for(i = 0; i < mobileNav.children.length; i++) {
			mobileNav.children[i].classList.toggle("active");
		}

		nav.classList.toggle("active");

		navH.on("tap", function() {
			nav.classList.remove("active");
			mobileNav.children[1].classList.remove("active");
			mobileNav.children[0].classList.add("active");
		});
	});

	/*
		Page swipe
	*/
	var aboutPage = document.getElementById('about');
	var moviePage = document.getElementById('movies');

	var aboutH = new Hammer(aboutPage);
	aboutH.on("panleft", function() {
		window.location.href = "#movies";
	});

	var movieH = new Hammer(moviePage);
	movieH.on("panright", function() {
		window.location.href = "#about";
	});

})();
