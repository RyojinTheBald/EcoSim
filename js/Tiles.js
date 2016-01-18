/*
 *	Tileset loader
 */
function TileSet(name){
	this.loaded = false;
	this.name = name;
	this.layers = new Array();
	var self = this;
	
	requirejs(['tileset/' + name], function(t) {
		// Loop over layers
		for (var layer in t) {
		    if (t.hasOwnProperty(layer)) {
		    	if(typeof(self.layers[layer]) == 'undefined') self.layers.push({});
		    	// Loop over tiles
        		for (var tileName in t[layer]) {
				    if (t[layer].hasOwnProperty(tileName)) {
				    	var tile = t[layer][tileName];

				    	var tileObj;

				    	if (typeof(tile[0]) == 'array')
				    		tile = tile[0];

				    	if (tile[0] == 'AnimatedTile'){
				    		var urls = new Array();
				    		for(var i = 0; i < tile[1].length; i++){
				    			urls.push('./tilesets/' + self.name + '/' + layer + '/' + tile[1][i])
				    		}
				    		tileObj = self.layers[layer][tileName] = new AnimatedTile(urls, tile[2]);
				    	}
				    	else if (tile[0] == 'SpriteTile'){
				    		var url = './tilesets/' + self.name + '/' + layer + '/' + tile[1]

				    		tileObj = self.layers[layer][tileName] = new SpriteTile(url);
				    	}
				    	else if (tile[0] == 'MultiTile'){
				    		var urls = new Array();
				    		for(var i = 0; i < tile[1].length; i++){
				    			urls.push('./tilesets/' + self.name + '/' + layer + '/' + tile[1][i])
				    		}
				    		tileObj = self.layers[layer][tileName] = new MultiTile(urls, tile[1] || false);
				    	}

				    	// Tile metadat present
				    	if (typeof(tile[1]) == 'object')
				    		tileObj.data = tile[1];

				    	console.log(tileObj);
				    		
				    }
				}
			}
		}
		self.loaded = true;
	});
}


/*
 *	Image sprite tile class
 */
function SpriteTile(imgURL, color){
	this.loaded = false;

	//Load tile image, handles async file loading
	this.img = new Image();
	var self = this;
	this.img.addEventListener("load", function() { self.loaded = true;}, false);
	this.img.src = imgURL;
}

SpriteTile.prototype.draw = function(context, x, y, size){
	var sz = size || game.tileSize;
	if(this.loaded)
		context.drawImage(this.img, x, y, sz, sz);
}

/*
 *	Animated image sprite
 */
function AnimatedTile(imgURLs, interval){
	MultiTile.call(this, imgURLs, true);
	this.index = -1;
	this.interval = interval;
	this.animationStep();
}

AnimatedTile.prototype = Object.create(MultiTile.prototype);

AnimatedTile.prototype.animationStep = function(){
	var self = this;
	this.nextTile();

	//Setup animation callback
	window.setTimeout(function(){
		self.animationStep(); 
	}, this.interval);
}



/*
 *	Tile with multiple stages
 */
function MultiTile(imgURLs, loop){
	this.index = 0;
	this.tiles = new Array();
	this.loop = loop || false;

	imgURLs.forEach(function(elm){
		this.tiles.push(new SpriteTile(elm))
	}, this);
}

MultiTile.prototype.draw = function(context, x, y, size){
	var t = this.tiles[this.index];
	var sz = size || game.tileSize;
	if(t.loaded)
		t.draw(context, x, y, sz);
}

MultiTile.prototype.nextTile = function(){
	this.index = (this.index < this.tiles.length - 1) ? (this.index + 1) : (this.loop ? 0 : this.index);
}

