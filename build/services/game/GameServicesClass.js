"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameServicesClass = /** @class */ (function () {
    function GameServicesClass(board) {
        //public newBoard: Board;
        this.tileMarkedCount = 0;
        this.tileMarkedMaxJ = 0;
        this.chosenColour1 = "";
        this.chosenColour2 = "";
        this.previousColour1 = "";
        this.firstLoop = false;
        this.boardTransitions = [];
        this.col = 0;
        this.k = 0;
        this.board = board;
        this.originalBoard = this.board;
        //this.newBoard = this.board;
        this.boardTransitions[0] = { chosenColour: "", board: this.board };
    }
    GameServicesClass.prototype.getfinalBoard = function () {
        //this.board.NewBoard();
        // let tempBoard: ITile[][] = [];
        // tempBoard = [...this.board.tiles];
        // const cols = tempBoard[0].length;
        /*         let newBoardDetails: NewBoardTileDetails = {
                    newBoard: tempBoard,
                    maxJ: 0
                }; */
        // let newBoardDetails = this.board;
        //let markDetails: TileMarkDetails;
        this.tileMarkedCount = 0;
        this.tileMarkedMaxJ = 0;
        this.col = 0;
        this.k = 0;
        this.previousColour1 = "";
        this.firstLoop = true;
        //console.log("Original Board:");
        //console.log(this.boardTransitions[0]);
        var col = this.col;
        while (this.k < this.board.tiles[0].length) {
            this.getMostPopularColorInColumnAlgo();
            // if(this.k==1)
            //break;
            console.log("this.chosenColour1: " + this.chosenColour1);
            console.log("this.k: " + this.k);
            console.log("this.board.coloursHashTable[this.chosenColour1]" + this.board.coloursHashTable[this.chosenColour1]);
            if (this.board.coloursHashTable[this.chosenColour1] == this.board.tiles.length) {
                this.k += 1;
                continue;
            }
            // if (this.firstLoop)
            //     this.markConnTilesByColourAlgo(0, col, this.chosenColour2);
            // else
            //     this.markConnTilesByColourAlgo(0, col, this.previousColour1);
            // this.firstLoop = false;
            this.markConnTilesByColourAlgo(0, col);
            // if (this.previousColour1 == this.chosenColour1) {
            //     this.nextBoardAlgo("", this.chosenColour2);
            //     this.previousColour1 = this.chosenColour2;
            // }
            // else {
            //     this.nextBoardAlgo("", this.chosenColour1);
            //     this.previousColour1 = this.chosenColour1;
            // }
            this.nextBoardAlgo();
            //console.log("Colour Chosen: " + this.previousColour1);
            //console.log("New Board: ");
            //console.log(this.board.tiles);
            //console.log(this.board.coloursHashTable);
            if (this.k == this.board.tiles[0].length - 1) {
                this.k = 0;
            }
            else {
                this.k += 1;
            }
        }
        return this.board;
    };
    GameServicesClass.prototype.markConnTilesByColourAlgo = function (i, j) {
        //console.log("Inside markConnTilesByColourAlgo");
        var color = "";
        if (this.firstLoop)
            color = this.chosenColour2;
        else
            color = this.previousColour1;
        this.firstLoop = false;
        if (!this.board.tiles[i][j].isTraversed)
            this.board.tiles[i][j].isTraversed = true;
        // else 
        //     return;
        //console.log("i: " + i + " - j: " + j + " -colour: " + color);
        //console.log("this.board.tiles[i][j].colour " + this.board.tiles[i][j].colour);
        if (this.board.tiles[i][j].colour == color) {
            // count = count + 1;
            this.board.tiles[i][j].isMarked = true;
            this.tileMarkedMaxJ = j > this.tileMarkedMaxJ ? j : this.tileMarkedMaxJ;
            this.tileMarkedCount += 1;
            if (j < this.board.tiles[0].length - 1) {
                this.markConnTilesByColourAlgo(i, j + 1);
            }
            if (j >= 1) {
                this.markConnTilesByColourAlgo(i, j - 1);
            }
            if (i < this.board.tiles.length - 1) {
                this.markConnTilesByColourAlgo(i + 1, j);
            }
            if (i >= 1) {
                this.markConnTilesByColourAlgo(i - 1, j);
            }
        }
        else {
            if (i < this.board.tiles.length - 1 && j == 0) {
                this.markConnTilesByColourAlgo(i + 1, j);
            }
        }
        // return tileMarkDetails;
    };
    GameServicesClass.prototype.getMostPopularColorInColumnAlgo = function () {
        //let tempBoard: ITile[][] = [];
        //tempBoard = [...this.board.tiles];
        // let tempboard4 = [...this.board.tiles];
        this.board.coloursHashTable = {};
        for (var i = 0; i < this.board.tiles.length; i++) {
            var colour = this.board.tiles[i][this.k].colour;
            //console.log("Inside get getMostPopularColorInColumnAlgo");
            if (this.board.coloursHashTable[colour] == undefined) {
                this.board.coloursHashTable[colour] = 1;
            }
            else {
                this.board.coloursHashTable[colour] += 1;
            }
        }
        //console.log(this.board.coloursHashTable);
        this.getChosenColorsAlgo();
    };
    GameServicesClass.prototype.getChosenColorsAlgo = function () {
        //console.log("Inside getChosenColorsAlgo");
        var dict_sorted = this.sortDictionary();
        //console.log(dict_sorted);
        this.chosenColour1 = dict_sorted[0] == undefined ? "" : String(dict_sorted[0][0]);
        this.chosenColour2 = dict_sorted[1] == undefined ? "" : String(dict_sorted[1][0]);
        //coloursHashTable: coloursHashTable
        //console.log(this.chosenColour1);
        //console.log(this.chosenColour2);
        // return chosenColours;
    };
    GameServicesClass.prototype.sortDictionary = function () {
        var dict = this.board.coloursHashTable;
        // Create items array
        var items = Object.keys(dict).map(function (key) {
            return [key, dict[key]];
        });
        // Sort the array based on the second element
        items.sort(function (first, second) {
            // return second[1] - first[1];
            return new Number(second[1]).valueOf() - new Number(first[1]).valueOf();
        });
        ////console.log(items);
        return items;
    };
    GameServicesClass.prototype.nextBoardAlgo = function () {
        // let newBoard: string[][] = [];
        // newBoard = [...board];
        //let maxJ = 0;
        var newColor = "";
        if (this.previousColour1 == this.chosenColour1) {
            newColor = this.chosenColour2;
            this.previousColour1 = this.chosenColour2;
        }
        else {
            newColor = this.chosenColour1;
            this.previousColour1 = this.chosenColour1;
        }
        for (var i = 0; i < this.board.tiles.length; i++) {
            for (var j = 0; j < this.board.tiles[i].length; j++) {
                if (this.board.tiles[i][j].isMarked) {
                    this.board.tiles[i][j].colour = newColor;
                    console.log("this.board.tiles[i][j].colour" + this.board.tiles[i][j].colour);
                    if (j > this.tileMarkedMaxJ) {
                        this.tileMarkedMaxJ = j;
                    }
                }
            }
        }
        //colourMovesArr.push(newColor);
        //return { newBoard, maxJ };
        this.boardTransitions.push({ chosenColour: newColor, board: this.board });
    };
    return GameServicesClass;
}());
exports.default = GameServicesClass;
///////////////////////////////////////////////////////////////////////////
