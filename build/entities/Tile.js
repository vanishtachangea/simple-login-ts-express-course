"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile = /** @class */ (function () {
    function Tile(id, colour, x, y, isMarked, isTraversed) {
        this.isMarked = false;
        this.isTraversed = false;
        this.id = id;
        this.colour = colour;
        this.xPos = x;
        this.yPos = y;
        if (isMarked)
            this.isMarked = isMarked;
        if (isTraversed)
            this.isTraversed = isTraversed;
    }
    return Tile;
}());
exports.default = Tile;
