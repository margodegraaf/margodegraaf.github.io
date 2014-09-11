/* 4.1: Local Scope
Maak met behulp van een function een local scope aan en definieer in deze local scope de variables ‘iterator’, ‘max’ en ‘min’ aan.
*/

/* UITLEG: 
Variables declared within a JavaScript function, become LOCAL to the function.
Local variables have local scope: They can only be accessed within the function. 

function localScope(){
	var iterator = 1;
	var max = 2;
	var min = 3;
	
	alert(iterator);
	alert(max);
	alert(min);
}

localScope();
*/


/* 4.2: Global Scope
Maak dezelfde variables nu ook aan in de global scope.
*/

/* UITLEG: 
A variable declared outside a function, becomes GLOBAL.
A global variable has global scope: All scripts and functions on a web page can access it. 

var iterator = 1;
var max = 2
var min = 3;

function globalScope(){
	alert(iterator);
	alert(max);
	alert(min);
}

globalScope();
*/


/* Global Scope en Local Scope naast elkaar met zelfde benamingen voor variabelen - Hebben dus geen effect op elkaar! */

var iterator = 1;
var max = 2;
var min = 3;

function globalScope(){
	alert(iterator);
	alert(max);
	alert(min);
}

globalScope();


function localScope(){
	var iterator = 4;
	var max = 5;
	var min = 6;
	
	alert(iterator);
	alert(max);
	alert(min);
}

localScope();



/* 4.3: Closure
Leg uit wat een closure is en maak een code voorbeeld */

/* UITLEG: 
Een closure maak je door middel van twee functies in elkaar te zetten.
De tweede functie kan variabele pakken uit de eerste functie ook al is deze dicht. */

function showName (firstName, lastName) {
	var nameIntro = "Your name is ";
    
    // this inner function has access to the outer function's variables, including the parameter
	function makeFullName () {
		var private = nameIntro;
        alert(nameIntro + firstName + " " + lastName);
	}
	return makeFullName ();
}

showName ("Michael", "Jackson"); // Your name is Michael Jackson