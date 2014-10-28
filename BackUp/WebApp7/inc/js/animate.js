(function() {
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

})();
