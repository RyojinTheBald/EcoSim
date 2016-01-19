/*
 *	Viewport Widget
 */

function Viewport (elm, config){
	var self = this;

	this.canvas = elm;
	this.context = elm.getContext('2d');

	this.x = 0;
	this.y = 0;
	this.w = this.canvas.width;
	this.h = this.canvas.height;

	this.tileSize = 40;

	this.dragging = false;
	this.dragStart = [0,0];
	this.dragViewportStart = [0,0];

	this.hasSelected = false;
	this.selectedTile = [0,0];

	this.enableSelect = true;
	this.enableEdit = true;

	config.forEach(function(key, val){
		self[key] = val;
	},
	this);


	// Generate background image
	this.bg = document.createElement('canvas');
	this.bg.height = this.canvas.height;
	this.bg.width = this.canvas.width;

	var ctx = this.bg.getContext("2d");

    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0,0,this.bg.width,this.bg.height);

    ctx.fillStyle = "#999999";

    var s = 5;

    var nCol = this.bg.width / s;
    var nRow = this.bg.height / s;

    for (var y = 0; y < nRow; y++){
    	for (var x = 0; x < nCol / 2; x++){
    		ctx.rect(2* x * s + (y % 2 ? 0 : s), y * s, s, s);
	   	}
    }

    ctx.fill();

	/*
	 *	Event handlers
	 */

	

	Viewport.prototype.onClick = function(event) {
		if (event.button == 0){
			if (!game.tileList.hasSelected && self.enableSelect){
				self.hasSelected = true;
				self.selectedTile = self.mouseOverTile;
				game.info.displayCoords(self.mouseOverTile);
			}


			if (game.tileList.hasSelected){
				var selectedTile = game.tileSet.layers[game.tileList.layer][game.tileList.selected];

				var tilex = self.mouseOverTile.x -1;
				var tiley = self.mouseOverTile.y -1;

				var l = game.map.getHighestLayer(tilex, tiley);
				var tile = game.map.layers[l][tilex][tiley] || null;

				// increment index when clicking on selected tile when already placed
				if(l >= 0 && tile[0].data.progressiveIndex && selectedTile.name == tile[0].name){
					tile[1].index = mod((tile[1].index || 0) + 1, tile[0].tiles.length);
				}
				else{
					if(game.map.layers[0][tilex][tiley][0].data.buildable){
						if(selectedTile.data.buildOn){
							if(game.map.layers[0][tilex][tiley][0].name == selectedTile.data.buildOn){
								game.map.place(game.tileList.layer, tilex, tiley, selectedTile);
							}
						}
						else{
							game.map.place(game.tileList.layer, tilex, tiley, selectedTile);
						}
					}
				}
			}
		}
		else if(event.button == 2){
			game.tileList.selectTile();
			self.hasSelected = false;
			self.enableSelect = true;
			game.info.clear();
		}

	}

	Viewport.prototype.mouseDownListener = function(event){
		if(event.button == 2) self.dragging = true;

		var bRect = self.canvas.getBoundingClientRect();
			
		self.dragStart = [
			(event.clientX - bRect.left) * (self.canvas.width / bRect.width),
			(event.clientY - bRect.top) * (self.canvas.height / bRect.height)];

		self.dragViewportStart = [self.x, self.y];
	}


	Viewport.prototype.mouseUpListener = function(event){
		self.dragging = false;
		
		var bRect = self.canvas.getBoundingClientRect();
			
		var dragEnd = [
			(event.clientX - bRect.left) * (self.canvas.width / bRect.width),
			(event.clientY - bRect.top) * (self.canvas.height / bRect.height)];
		
		if (Math.floor(self.dragStart[0]) == Math.floor(dragEnd[0]) &&
			Math.floor(self.dragStart[1]) == Math.floor(dragEnd[1])){
			self.onClick(event);
		}

	}


	Viewport.prototype.mouseMoveListener = function(event){
		var bRect = self.canvas.getBoundingClientRect();
			
		self.mouseOverTile = new Point(
			(event.clientX - bRect.left) * (self.canvas.width / bRect.width),
			(event.clientY - bRect.top) * (self.canvas.height / bRect.height)
			).floor().add(game.viewport).div(new Point(self.tileSize, self.tileSize)).ceil();

		if(self.dragging === true){
			var bRect = self.canvas.getBoundingClientRect();
			
			mousex = (event.clientX - bRect.left) * (self.canvas.width / bRect.width);
			mousey = (event.clientY - bRect.top) * (self.canvas.height / bRect.height);

			self.x = self.dragViewportStart[0] - (mousex - self.dragStart[0]);
			self.y = self.dragViewportStart[1] - (mousey - self.dragStart[1]);


			//Clamp viewport to map extents
			self.clamp();
		}

	}


	// Disable right click menu
	Viewport.prototype.contextMenuListener = function(event){
		event.preventDefault();
		return false;
	}

	Viewport.prototype.scrollWheelListener = function(event){
		var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

		var oldsize = self.tileSize;

		self.tileSize += delta * 5;

		if (self.tileSize < self.zoomMin) self.tileSize = self.zoomMin;
		if (self.tileSize > self.zoomMax) self.tileSize = self.zoomMax;

		//TODO: zoom centered on mouse cursor



		self.clamp();

		return false;
	}






	//Setup event listeners
	//this.canvas.addEventListener('click', this.onClick, false);
	this.canvas.addEventListener("mousedown", this.mouseDownListener, false);
	window.addEventListener("mouseup", this.mouseUpListener, false);
	window.addEventListener("mousemove", this.mouseMoveListener, false);
	window.addEventListener("contextmenu", this.contextMenuListener, false);
	this.canvas.addEventListener('mousewheel', this.scrollWheelListener, false);
	this.canvas.addEventListener("DOMMouseScroll", this.scrollWheelListener, false);

}

Viewport.prototype.draw = function(map, tileSet){
	var drawStart = window.performance.now();
	this.context.fillStyle = "#ffffff";
	this.context.fillRect(0,0,this.w, this.h);

	var mapx = Math.floor(this.x / this.tileSize);
	var mapy = Math.floor(this.y / this.tileSize);

	var mapx2 = Math.floor((this.x + this.w) / this.tileSize);
	var mapy2 = Math.floor((this.y + this.h) / this.tileSize);

	if (mapx2 > map.width) mapx2 = map.width -1 ;
	if (mapy2 > map.height) mapy2 = map.height -1;

	if (! tileSet.loaded)
		return;

	this.context.drawImage(this.bg, 0, 0, this.w, this.h);

	// Loop over x coordinates, y coordiantes, and layers
	for (var x = mapx; x <= mapx2; x++){
		for (var y = mapy; y <= mapy2; y++){
			for (var i = 0; i < map.layers.length; i++){
				if (x < map.width && y < map.height){



		var tile = map.layers[i][x][y];
		if (tile != null ){
			if(typeof(tile) != 'undefined'){

				if (tile[0].draw){
					tile[0].draw(
						this.context,
						Math.floor((x * this.tileSize) - this.x), 
						Math.floor((y * this.tileSize) - this.y),
						this.tileSize, tile[1]);
				}
				else{
					console.log('Tile error', tile, tileSet.layers[i]);
				game.animating = false;
				return;
				}
			}
			else
			{
				console.log('Tile error', tile, tileSet.layers[i]);
				game.animating = false;
				return;
			}
		}



				}					
			}
		}
	}

	if (this.hasSelected) {
		this.context.fillStyle = "rgba(128, 256, 128, 0.5)";

		this.context.fillRect(
			Math.floor(((this.selectedTile.x - 1) * this.tileSize) - this.x), 
			Math.floor(((this.selectedTile.y - 1) * this.tileSize) - this.y),
			this.tileSize, 
			this.tileSize);
	}

	game.status("Render time: " + Math.round((window.performance.now() - drawStart) * 1000) / 1000 + "ms");
}


Viewport.prototype.clamp = function(){
	if (this.x + this.w > game.map.width * this.tileSize)
		this.x = (game.map.width * this.tileSize) - this.w;

	if (this.y + this.h > game.map.height * this.tileSize)
		this.y = (game.map.height * this.tileSize) - this.h;

	if (this.x < 0) this.x = 0;
	if (this.y < 0) this.y = 0;
}
