

function InfoWindow(element){
	this.element = element;
}

InfoWindow.prototype.displayCoords = function(coords){
	this.element.innerHTML = "";
	for(var i = 0; i < game.map.layers.length; i++) {
		var tileRef = game.map.layers[i][coords.x-1][coords.y-1];
		var tileName, tileData;

		if (tileRef){

			if (typeof(tileRef) == 'object'){
				tileName = tileRef[0];
				tileData = tileRef[1];
			}else {
				tileName = tileRef;
			}

			this.element.innerHTML += "Layer "+i+": " + tileName.name + "<br>"
			if (tileData)
				for (key in tileData){
					if (tileData.hasOwnProperty(key))
						this.element.innerHTML += key + ": " + tileData[key]+ "<br>";
				}
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