

function BuildLayer(map){
	Map.call(this);
	this.width = map.width || 0;
	this.height = map.height || 0;
}

BuildLayer.prototype = Object.create(Map.prototype);