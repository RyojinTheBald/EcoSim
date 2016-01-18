
/*
 *	Event Listeners
 */

game.onClick = function(event) {
	var bRect = game.canvas.getBoundingClientRect();
		
	game.selectedTile = new Point(
		(event.clientX - bRect.left) * (game.canvas.width / bRect.width),
		(event.clientY - bRect.top) * (game.canvas.height / bRect.height)
		).floor().add(game.viewport).div(new Point(game.tileSize, game.tileSize)).ceil();

	game.hasSelected = true;
}

game.mouseDownListener = function(event){
	game.dragging = true;
	var bRect = game.canvas.getBoundingClientRect();
	
	game.dragStart = new Point(
		(event.clientX - bRect.left) * (game.canvas.width / bRect.width),
		(event.clientY - bRect.top) * (game.canvas.height / bRect.height));

	game.dragViewportStart = game.viewport.clone();

}


game.mouseUpListener = function(event){
	if (game.dragging){
		game.dragging = false;
		var bRect = game.canvas.getBoundingClientRect();
		
		var dragEnd = new Point(
			(event.clientX - bRect.left) * (game.canvas.width / bRect.width),
			(event.clientY - bRect.top) * (game.canvas.height / bRect.height));

		if (game.dragStart.floor().eq(dragEnd.floor())) game.onClick(event);
	}
}


game.mouseMoveListener = function(event){
	if(game.dragging === true){
		var bRect = game.canvas.getBoundingClientRect();
		
		mousex = (event.clientX - bRect.left) * (game.canvas.width / bRect.width);
		mousey = (event.clientY - bRect.top) * (game.canvas.height / bRect.height);

		game.viewPort.x = game.dragViewportStart.x - (mousex - game.dragStart.x);
		game.viewPort.y = game.dragViewportStart.y - (mousey - game.dragStart.y);


		//Clamp viewport to map extents
		game.clampViewport();
	}

}



game.contextMenuListener = function(event){
	event.preventDefault();
	game.hasSelected = false;
	return false;
}

game.scrollWheelListener = function(event){
	var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

	var oldsize = game.tileSize;

	game.tileSize += delta * 5;

	if (game.tileSize < game.zoomMin) game.tileSize = game.zoomMin;
	if (game.tileSize > game.zoomMax) game.tileSize = game.zoomMax;


	//TODO: zoom centered on mouse cursor



	game.clampViewport();

	return false;
}
