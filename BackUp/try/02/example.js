// Bron: http://singlebrook.com/blog/simplify-your-javascript-with-underscorejs

var jossWhedon = { 
	age: 49, 
	occupations: ["writer", "director", "producer", "composer", "actor"], 
	shows: [
		{ 
		title: "Dollhouse", 
		femaleLead: true, 
		characters: [
			{ name: "Echo", role: "doll" }, 
			{ name: "Topher", role: "mad scientist" }] 
		}, 
		{ 
		title: "Dr. Horrible's Sing-Along Blog", 
		characters: [
			{ name: "Billy", role: "mad scientist" }, 
			{ name: "Penny", role: "love interest" }]
		}, 
		{ 
		title: "Buffy the Vampire Slayer", 
		femaleLead: true, 
		characters: [
			{ name: "Buffy", role: "slayer" }, 
			{ name: "Angel", role: "love interest" }]
		}, 
		{ 
		title: "Firefly", 
		characters: [
			{ name: "Mal", role: "captain" }, 
			{ name: "Kaylee", role: "mechanic" }]
		}
	] 
}


/* pluck 
Met pluck kan je specifieke values van properties uit een array pakken. 

var pluck = _.pluck(jossWhedon.shows, "title"); 
console.log(pluck); 
//["Dollhouse", "Dr. Horrible's Sing-Along Blog", "Buffy the Vampire Slayer", "Firefly"]
*/


/* map 
Met pluck pak je alle name values uit de array Tuts, en met map stop je deze bij elkaar in een array. 
 
var map = _.pluck('jossWhedon.shows', "title").map(function (value){return value }); 
console.log(map); 
*/


/* Reduce
Reduce maakt een lijstje verkregen values tot 1 value.
In de callback functie worden de parameter "memo" en "show" meegegeven.
memo: the initial value that will be passed as memo argument to the callback on its very first invocation.
show: the resulting value. If the list was empty, it returns the memo argument.
De concat() methode word gebruikt om meerdere arrays tot 1 array te maken. 
var reduce = _.reduce(jossWhedon.shows, function(memo, show) { 
	return memo.concat(show.characters); 
}, []); 

console.log(reduce); 
// [{ name: "Echo", role: "doll" }, et cetera.
*/


/* filter
Met filter bekijk je alle aangegeven properties/values om te zien of er overeenkomsten zijn met de value die je hebt aangegeven. 
var filter = _.pluck(_.filter(jossWhedon.shows, function(show) { 
	return show.femaleLead; }), "title"); 
	
console.log(filter);	
//["Dollhouse", "Buffy the Vampire Slayer"]
*/


/* where
De functie where laat gevonden alle matches in een object zien.
Om het voorbeeld te laten werken even twee Buffy objecten in content aanmaken 

var show = _.where(jossWhedon.shows, {title: "Buffy the Vampire Slayer"});
console.log(show);	
// {title: "Buffy the Vampire Slayer", femaleLead: true, characters: Array[2]}
*/

/* findWhere
De functie findWhere laat de eerste gevonden match in een object zien. 

var show = _.findWhere(jossWhedon.shows, {title: "Buffy the Vampire Slayer"});
console.log(show);	
// {title: "Buffy the Vampire Slayer", femaleLead: true, characters: Array[2]}
*/


/* sortBy
Deze functie maakt een gesorteerd lijstje in alfabetische volgorde. Je kan de manier waarop hij kijkt aanpassen door bijvoorbeeld de lengte van een string. 

var sort = _.sortBy(jossWhedon.shows, function(item){
    return item.title;
});
console.log(sort);
// [Buffy the vampire slayer, Dollhouse, Dr. Horrible, Firefly]
*/


/* groupBy
Deze functie maakt een object met daarin vier arrays aan. Niet op alfabetische volgorde. 

var sort = _.groupBy(jossWhedon.shows, function(item){
    return item.title;
});
console.log(sort);
// Object { [Dollhouse], [Dr. Horrible], [Buffy the vampire slayer], [Firefly]
*/


/* countBy 
Hier gebruik je de pluck functie om alle rollen van elke show te pakken, om zo te zien welke vaker voorkomen.
Deze worden vervolgens met de flatten functie in 1 array gestopt.
Om vervolgens met de countBy functie geteld te worden. 

var count =_.countBy(_.flatten(_.pluck(jossWhedon.shows, "characters")), "role"); 
console.log(count);
// {doll: 1, mad scientist: 2, love interest: 2, slayer: 1, captain: 1…}
*/


/* 	extend	
Kopieert alle properties in een een nieuw object. Dit werkt overschrijdend dus pas op!
In dit voorbeeld deel ik eerst twee properties voordat ik deze in score property plaats. 

VOEG TOE AAN CONTENT:
score: [ {
	age: 49, 
	random: 11
}], 

var extend = _.each(jossWhedon.score, function(elem, indx) {
        _.extend(elem, {score : (elem.age + elem.random) / 2});
      });
console.log(extend);
// score: 30
*/