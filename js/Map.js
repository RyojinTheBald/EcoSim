
/*
 *	Map definition
 */
function Map(data) {
	this.loaded = true;
	this.width = 0;
	this.height = 0;
	this.layers = new Array();
	this.layers.push(new Layer(this.width, this.height));

	if (typeof(data) != 'undefined')
		this.load(data);
}

Map.prototype.addLayer = function() {
	var l = new Layer(this.width, this.height)
	this.layers.push(l);
	return l;
}

Map.prototype.fill = function(tile, layer){
	var l = layer || 0;

	var t = this.layers[l].tiles.push(tile);
	
	for(var x = 0; x < this.width; x++){
		for(var y = 0; y < this.height; y++){
			this.layers[l][x][y] = this.layers[l].tiles[t-1];
		}
	}
}

Map.prototype.random = function(layer){
	layer = layer || 0;
	for(var i = 0; i < this.numTiles; i++){
		this.tiles[i] = new Tile(getRandomColor());
	}

	for(var x = 0; x < this.width; x++){
		for(var y = 0; y < this.height; y++){
			this.layers[0][x][y] = this.tiles[Math.floor(Math.random() * this.tiles.length)];
		}
	}
}

Map.prototype.save = function(){
	return LZW.compress(JSON.stringify({
		width: this.width,
		height: this.height,
		layers: this.layers
	}));
}

Map.prototype.load = function(string){
	var data;
	if(typeof(string) == 'string')
		data = JSON.parse(LZW.decompress(JSON.parse("["+string+"]")));
	else
		data = JSON.parse(LZW.decompress(string.data));

	this.width = data.width;
	this.height = data.height;
	this.layers = data.layers;
	this.loaded = true;
}



/*
 *	Map layer definition
 */
function Layer(width, height, offset){
	Array.apply(width, this);
	for(var i = 0; i < width; i++){
		this.push(new Array(height));
	}
	this.width = width;
	this.height = height;
	this.offset = offset || [0,0];
	this.tiles = new Array();
}

Layer.prototype = new Array;

Layer.prototype.getTileByName = function(name){
	for(var i = 0; i < this.tiles.length; i++)
		if (this.tiles[i].name == name) return this.tiles[i];
}



/*
 *	Sparse layer, used for entities
 */
function SparseLayer(width, height, offset){
	this.width = width;
	this.height = height;
	this.offset = offset || [0,0];
	this.entites = {};
}

SparseLayer.prototype.add = function(x, y, entity){
	if (typeof(this.entities[x, y]) == 'undefined')
		this.entities[[x, y]] = entity;
}




	/*
	 *	Map generation
	 */
	/*
	this.map = new Map(50, 50);

	this.map.fill('Water');

	// Terrain layer
	var l = this.map.layers[0];

	for(var x = 5; x < 15; x++){
		for(var y = 5; y < 15; y++){
			l[x][y] = 'Grass';
		}
	}

	// Terrain transition layer
	var l = this.map.addLayer();

	for(var x = 5; x < 15; x++){
		l[x][4] = 'Beach S';
		l[x][15] = 'Beach N';

		l[4][x] = 'Beach E';
		l[15][x] = 'Beach W';
	}

	// Structures
	this.map.addLayer();
*/