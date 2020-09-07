"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(name) {
        this.name = name;
    }
    Game.prototype.start = function (iplayable) {
        iplayable.NewBoard();
    };
    Game.prototype.nextMove = function (iplayable, colour) {
    };
    Game.prototype.allAIMoves = function (iplayable, colour) {
        //  GameServicesClass.getfinalBoard(iplayable);
    };
    return Game;
}());
exports.default = Game;
