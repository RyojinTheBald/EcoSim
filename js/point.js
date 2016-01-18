
/*
 *	Point class, simplifies point manipulation
 */

function Point(x, y) {
	this.x = x;
	this.y = y;
	return this;
}

Point.prototype.add = function(point) {
	this.x += point.x;
	this.y += point.y;
	return this;
}

Point.prototype.sub = function(point) {
	this.x -= point.x;
	this.y -= point.y;
	return this;
}

Point.prototype.mul = function(point) {
	this.x *= point.x;
	this.y *= point.y;
	return this;
}

Point.prototype.div = function(point) {
	this.x /= point.x;
	this.y /= point.y;
	return this;
}

Point.prototype.floor = function() {
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	return this;
}

Point.prototype.ceil = function() {
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
	return this;
}

Point.prototype.clone = function() {
	return new Point(this.x, this.y);
}

Point.prototype.eq = function(point) {
	return this.x == point.x && this.y == point.y;
}
