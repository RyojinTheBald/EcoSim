
/*
 *	Helper functions
 */
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Object.prototype.forEach = function(callback){

  for (var key in this) {
    // skip loop if the property is from prototype
    if (!this.hasOwnProperty(key)) continue;

    callback(key, this[key]);
  }
}

// Stolen from stackoverflow
function drawCheckeredBackground(can, nRow, nCol){
    var ctx = can.getContext("2d");
    var w = can.width;
    var h = can.height;


    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = "#999999";

    nRow = nRow || 8;    // default number of rows
    nCol = nCol || 8;    // default number of columns

    w /= nCol;            // width of a block
    h /= nRow;            // height of a block

    for (var i = 0; i < nRow; ++i) {
        for (var j = 0, col = nCol / 2; j < col; ++j) {
            ctx.rect(2 * j * w + (i % 2 ? 0 : w), i * h, w, h);
        }
    }

    ctx.fill();
}