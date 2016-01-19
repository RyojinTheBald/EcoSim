
/*
 *	Map definition
 */
function Map(data) {
	this.compressSave = true;
	this.loaded = true;
	this.width = 0;
	this.height = 0;
	this.layers = new Array();

	if (typeof(data) == 'object'){
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (key == 'layers') {
					for (i = 0; i < data[key]; i++){
						this.addLayer();
					}
				}
				else if (key == 'mapdata') {
					this.load(data[key]);
				}
				else{
					this[key] = data[key];	
				}
				
			}
		}
	}
}

Map.prototype.addLayer = function() {
	var l = new Layer(this.width, this.height)
	this.layers.push(l);
	return l;
}

Map.prototype.fill = function(layer, tile){
	var l = layer || 0;

	//var t = this.layers[l].tiles.push(tile);
	
	for(var x = 0; x < this.width; x++){
		for(var y = 0; y < this.height; y++){
			this.place(l, x, y, tile);
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
	var s = {
		width: this.width,
		height: this.height
	};

	var l = new Array();
	for (var i = 0; i < this.layers.length; i++){
		l.push(new Array())
		for (var x = 0; x < this.layers[i].length; x++){
			l[i].push(new Array());
			for (var y = 0; y < this.layers[i][x].length; y++){
				l[i][x].push(new Array());

				var tile = this.layers[i][x][y];
				if (tile == null)
					l[i][x][y] = null;
				else
					l[i][x][y] = [tile[0].name, tile[1]];
			}
		}
	}
	s.layers = l;

	var json = JSON.stringify(s);

	if (this.compressSave)
		return LZW.compress(json);
	else
		return json;
	
}

Map.prototype.load = function(string){
	var data;
	if(typeof(string) == 'string')
		if (this.compressSave)
			data = JSON.parse(LZW.decompress(JSON.parse("["+string+"]")));
		else
			data = JSON.parse(string);
	else
		if (this.compressSave)
			data = JSON.parse(LZW.decompress(string.data));
		else
			data = string.data;

	this.width = data.width;
	this.height = data.height;

	var l = new Array(data.layers.length);
	for (var i = 0; i < l.length; i++){
		l[i] = new Array(this.width);
		for (var x = 0; x < this.width; x++){
			l[i][x] = new Array(this.height);
			for (var y = 0; y < this.height; y++){
				

				var tile = data.layers[i][x][y];
				if (tile != null)
					l[i][x][y] = [game.tileSet.layers[i][tile[0]], data.layers[i][x][y][1]];
			}
		}
	}
	this.layers = l;

	this.loaded = true;
}


Map.prototype.place = function(layer, x ,y, tile){
	var lref = [tile, {}];

	if(!tile){
		this.layers[layer][x][y] = null;
		return;
	}

	if (tile.data){
		if (tile.data.randomIndex){
			lref[1].index = Math.floor(Math.random() * (tile.tiles.length ));
		}
	}

	this.layers[layer][x][y] = lref;
}



Map.prototype.getHighestLayer = function(x, y){
	var l = 0
	for (var i = 0; i < this.layers.length; i++)
		if (this.layers[i][x][y] != null)
			l = i;
	return l;
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