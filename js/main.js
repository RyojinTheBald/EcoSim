
requirejs.config({
	baseUrl: 'js',
	paths: {
		tileset: '../tilesets'
	}
});

requirejs(["Tiles", "Map", "point", "helpers", "Viewport", "TileList", "InfoWindow", 
	"Entity", "BuildLayer", "../lib/lzw"], function() { game.onLoad(); });

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
		//game.map = new Map(m);
		//game.buildLayer = new BuildLayer(game.map);

		game.map = new Map({width: 40, height: 40, layers: 3});

		game.map.fill(0, game.tileSet.layers[0]['Grass']);

		console.log("Game object", game);

		//Start main loop
		game.animLoop();
	});
};


/*
 *	Main loop
 */
game.animLoop = function(){
	if (game.tileSet.loaded && game.map.loaded && game.animating){
		if (game.animating !== true)
			game.animating --;

		game.viewport.draw(game.map, game.tileSet);
		game.tileList.draw(game.tileSet);

	}
	if (game.animating)
		requestAnimFrame(game.animLoop);
	else
		window.setTimeout(game.animLoop, 1000 / 10);

}

game.status = function(text){
	document.getElementById('status').innerHTML = text;
}