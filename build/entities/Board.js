"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = __importDefault(require("./Tile"));
var Board = /** @class */ (function () {
    function Board(rows, columns, tiles, colourPalette) {
        this.rows = 0;
        this.columns = 0;
        this.tiles = [];
        //public initialBoard: IBoard;
        //public boardTransitions: { chosenColour: string, newBoard: IBoard }[];
        //public boardTransitions: { chosenColour: string, board: IPlayable }[] = [];
        //public colourPalette: string[] = ["#fb1700", "#f8dd7d", "#95c4cc"];
        this.colourPalette = ["red", "blue", "green"];
        this.coloursHashTable = {};
        this.rows = rows;
        this.columns = columns;
        if (tiles) {
            this.tiles = tiles;
        }
        if (colourPalette) {
            this.colourPalette = colourPalette;
        }
        this.NewBoard();
        //this.initialBoard = this;
    }
    Board.prototype.NewBoard = function () {
        var id = 1;
        this.tiles = new Array();
        if (this.rows > 0 && this.columns > 0) {
            for (var i = 0; i < this.rows; i++) {
                this.tiles[i] = new Array();
                for (var j = 0; j < this.columns; j++) {
                    this.tiles[i][j] = new Tile_1.default(String(id++), this.getRandomArrayItem(this.colourPalette), i, j);
                }
            }
        }
    };
    Board.prototype.getRandomArrayItem = function (items) {
        return items[Math.floor(Math.random() * items.length)];
    };
    return Board;
}());
exports.default = Board;
