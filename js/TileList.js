/*
 *	Tile list Widget
 */

function TileList(elm, tileSize, tileSet){
	this.element = elm;
	//this.context = elm.getContext('2d');
	this.hasSelected = false;
	this.selected = 0;
	this.tileSize = tileSize || 40;
	this.tileSet = tileSet;
	this.layer = -1;

	this.bg = document.createElement('canvas');
	this.bg.height = this.bg.width = this.tileSize;

	drawCheckeredBackground(this.bg);

}

TileList.prototype.draw = function(){
	// Setup delayed until first draw call, as that's when we can be sure the tileset is loaded
	if (this.layer == -1){
		this.setLayer(0);

		var list = document.getElementById('layerSelect');

		// Setup tile layers
		for (var i = 0; i < this.tileSet.layers.length; i++){
			var opt = document.createElement('option');
			opt.text = 'Layer ' + i;
			opt.value = i;
			list.add(opt);
		}

		// Setup build layer
		var opt = document.createElement('option');
		opt.text = 'Build';
		opt.value = i;
		list.add(opt);


		// Setup entity layer
		var opt = document.createElement('option');
		opt.text = 'Entities';
		opt.value = i;
		list.add(opt);

		var self = this;
		list.addEventListener('change', function(event){
			self.setLayer(this.value);
		});

	}

	// Actual draw begins here
	var list = document.getElementsByClassName('tilepreview');
	for (var i = 0; i < list.length; i++){
		var ctx = list[i].getContext('2d');
		ctx.drawImage(this.bg, 0, 0);

		if (list[i].id != 'Delete')
			game.tileSet.layers[this.layer][list[i].id].draw(ctx, 0, 0, this.tileSize);
	}
}

TileList.prototype.addTile = function(tile){
    var c, r;
    r = this.element.insertRow(0);
    c = r.insertCell(0);
    c.innerHTML = '<canvas class="tilepreview" id="'+tile+'" width="'+this.tileSize+'" height="'+this.tileSize+'"></canvas>';
    c = r.insertCell(1);
    c.innerHTML = tile;
    this.element.appendChild(r);

    r.id = tile;

    var self = this;
    r.addEventListener('click', function(event){
    	self.selectTile(this.id);
    })
}

TileList.prototype.setLayer = function(layer){
	this.layer = layer;
	
	this.clearTiles();

	this.addTile('Delete');

	for (var name in this.tileSet.layers[this.layer]) {
	    if (this.tileSet.layers[this.layer].hasOwnProperty(name)) {
	        this.addTile(name);
	    }
	}
	this.hasSelected = false;
}

TileList.prototype.clearTiles = function(){
	this.element.innerHTML = "";
}

TileList.prototype.selectTile = function(name){
	var elm = document.getElementById('tileList');

	for (var i = 0; i < elm.children.length; i++){
		elm.children[i].className = "";
	}

	if (!name){
		this.hasSelected = false;
		this.selected = null;
		return;
	}

	document.getElementById(name).className = "selected";
	if(name == 'Delete')
		this.selected = null;
	else
		this.selected = name;
	this.hasSelected = true;

	game.viewport.hasSelected = false;
	game.info.display(name, game.tileSet.layers[this.layer][name]);
}