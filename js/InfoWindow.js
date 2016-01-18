

function InfoWindow(element){
	this.element = element;
}

InfoWindow.prototype.display = function(coords){
	this.element.innerHTML = "";
	this.element.innerHTML += "Layer 1: " + game.map.layers[0][coords.x-1][coords.y-1] + "<br>";
	this.element.innerHTML += "Layer 2: " + game.map.layers[1][coords.x-1][coords.y-1] + "<br>";
	this.element.innerHTML += "Layer 3: " + game.map.layers[2][coords.x-1][coords.y-1] + "<br>";
}

InfoWindow.prototype.clear = function(){
	this.element.innerHTML = "";
}