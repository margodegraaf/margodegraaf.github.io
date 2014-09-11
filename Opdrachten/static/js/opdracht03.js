/* 3.1: Constructor object
Maak met een Constructor object een ‘Persoon’-object aan. Voeg de property ‘name’ en de method ‘speak’ toe. 
En maak een nieuwe instantie aan van dit object waarbij je de naam ‘Bob’ meegeeft als parameter van het object. 
*/

/* UITLEG
Een constuctor object is een blauwdruk hoe iets moet worden gemaakt, daarna kan je het zovaak als je wilt hergebruiken.
*/

function Persoon(name) {
	this.name = name;
	this.speak = function() {
		alert( this.name + " zegt: 'Dit is een constructor object'" )
	}
} 

var persoon1 = new Persoon ("Bob")
persoon1.speak(); //alerts "Dit is een constructor object"



/* 3.2: Prototype
Voeg de methods ‘walk’ en ‘eat’ toe aan het ‘Persoon’-object met de prototype function van het object. 
*/

/* UITLEG
Met de prototype functie kan je methoden en waarden toevoegen aan je constructor object.
Een prototype wordt maar 1x ingeladen waardoor er minder rekenkracht nodig is en de performance beter wordt.
*/

function Persoon(name) {
	this.name = name;
	this.speak = function() {
		alert( this.name + " zegt: 'Dit is een constructor object'" )
	}
} 

Persoon.prototype.walk = function() {
		console.log(this.name + " is walking");
}

Persoon.prototype.eat = function() {
		console.log('Hi, my name is ' + this.name + " and I eat");
}
	
var persoon1 = new Persoon ("Bob")
persoon1.speak(); 

var persoon2 = new Persoon ("Boberta")
persoon2.walk(); 

var persoon3 = new Persoon ("Margo")
persoon3.eat(); 



/* 3.3: Object Literal
Maak nu hetzelfde object, met dezelfde properties en methods aan met een object literal
*/

/* UITLEG
Een object literal is eigenlijk het tegenovergestelde van een constructor object.
Hij wordt vooral gebruikt als eenmalig iets. 
De functie zou je ook nog weg kunnen laten, maar dit vond ik even makkelijker.
*/

function Mensen() {
	var persoon = {
		name: 	"Bob",
		speak: 	function() { alert( this.name + " zegt: 'Dit is een literal object'"); },
		walk: 	function() { console.log(this.name + " is walking"); },
		eat: 	function() { console.log(this.name + " is eating");},
	};
	
	persoon.speak();
	persoon.walk();
	persoon.eat();
}

Mensen();