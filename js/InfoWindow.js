

function InfoWindow(element){
	this.element = element;
}

InfoWindow.prototype.displayCoords = function(coords){
	this.element.innerHTML = "";
	for(var i = 0; i < 3; i++) {
		var tileName = game.map.layers[i][coords.x-1][coords.y-1];
		var tile = game.tileSet.layers[i][tileName];
		this.element.innerHTML += "Layer "+i+": " + tileName + "<br>"
		if (tile)
			for (key in tile.data){
				if (tile.data.hasOwnProperty(key))
					this.element.innerHTML += key + ": " + tile.data[key]+ "<br>";
			}
	}
}


InfoWindow.prototype.display = function(tileName, tile){
	this.element.innerHTML = "";
	this.element.innerHTML += tileName + "<br>"
	if (tile)
		for (key in tile.data){
			if (tile.data.hasOwnProperty(key))
				this.element.innerHTML += key + ": " + tile.data[key]+ "<br>";
		}

}

InfoWindow.prototype.clear = function(){
	this.element.innerHTML = "";
}