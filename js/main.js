
requirejs.config({
	baseUrl: 'js',
	paths: {
		tileset: '../tilesets'
	}
});

requirejs(["Tiles", "Map", "point", "helpers", "Viewport", "TileList", "InfoWindow", "Entity", "BuildLayer", "../lib/lzw"], function() { game.onLoad(); });

/*
 *	Main class definition
 */
var game = new function() {
	this.tileSize = 40;
	this.animating = true;
};

/*
 *	Initialisation
 */
game.onLoad = function() {

	this.tileSet = new TileSet("default");
	this.tileList = new TileList(document.getElementById('tileList'), this.tileSize, this.tileSet);
	this.viewport = new Viewport(document.getElementById('viewport'), {zoomMin: 10, zoomMax: 80, tileSize: this.tileSize});
	this.info = new InfoWindow(document.getElementById('info'));

	this.entities = new Array();



	// Stops rendering when window is minimised
	document.addEventListener("visibilitychange", function() {
		game.animating = !document.hidden;
	}, false);


	// Load map from file
	requirejs(['../maps/map1'], function(m) {
		game.map = new Map(m);
		game.buildLayer = new BuildLayer(game.map);


		//Start main loop
		game.animLoop();
	});
};


/*
 *	Main loop
 */
game.animLoop = function(){
	if (game.animating)
		requestAnimFrame(game.animLoop);
	else
		window.setTimeout(game.animLoop, 1000 / 10);

	if (game.tileSet.loaded && game.map.loaded && game.animating){
		game.viewport.draw(game.map, game.tileSet);
		game.tileList.draw(game.tileSet);
	}
}

game.status = function(text){
	document.getElementById('status').innerHTML = text;
}






