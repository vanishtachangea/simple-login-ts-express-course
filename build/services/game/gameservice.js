"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalBoardAlgo = exports.nextMove = exports.nextBoardAlgo = exports.sortDictionary = exports.getChosenColorsAlgo = exports.markConnTilesByColourAlgo = exports.getMostPopularColorInColumnAlgo = void 0;
var chosenColours;
var colourMovesArr = [];
///////////////////////////////////////////////////////////////////////////
exports.getMostPopularColorInColumnAlgo = function (board, coloursHashTable, col) {
    var tempBoard = [];
    tempBoard = __spreadArrays(board);
    var tempboard4 = __spreadArrays(board);
    coloursHashTable = {};
    for (var i = 0; i < board.length; i++) {
        var colour = tempboard4[i][col];
        if (coloursHashTable[colour] == undefined) {
            coloursHashTable[colour] = 1;
        }
        else {
            coloursHashTable[colour] += 1;
        }
    }
    chosenColours = exports.getChosenColorsAlgo(coloursHashTable);
    return chosenColours;
};
var tileMarkDetails = {
    markedCount: 0,
    maxJ: 0
};
exports.markConnTilesByColourAlgo = function (board, i, j, color, count, maxJ) {
    if (board[i][j] == color) {
        count = count + 1;
        board[i][j] = 'X';
        tileMarkDetails.maxJ = j > tileMarkDetails.maxJ ? j : tileMarkDetails.maxJ;
        tileMarkDetails.markedCount = count;
        if (j < board[0].length - 1) {
            tileMarkDetails = exports.markConnTilesByColourAlgo(board, i, j + 1, color, count, maxJ);
        }
        if (j >= 1) {
            tileMarkDetails = exports.markConnTilesByColourAlgo(board, i, j - 1, color, count, maxJ);
        }
        if (i < board.length - 1) {
            tileMarkDetails = exports.markConnTilesByColourAlgo(board, i + 1, j, color, count, maxJ);
        }
        if (i >= 1) {
            tileMarkDetails = exports.markConnTilesByColourAlgo(board, i - 1, j, color, count, maxJ);
        }
    }
    else {
        if (i < board.length - 1 && j == 0) {
            tileMarkDetails = exports.markConnTilesByColourAlgo(board, i + 1, j, color, count, maxJ);
        }
    }
    return tileMarkDetails;
};
exports.getChosenColorsAlgo = function (coloursHashTable) {
    var dict_sorted = exports.sortDictionary(coloursHashTable);
    chosenColours = {
        colourNo1: dict_sorted[0] == undefined ? "" : String(dict_sorted[0][0]),
        colourNo2: dict_sorted[1] == undefined ? "" : String(dict_sorted[1][0]),
        coloursHashTable: coloursHashTable
    };
    return chosenColours;
};
exports.sortDictionary = function (dict) {
    // Create items array
    var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
    });
    // Sort the array based on the second element
    items.sort(function (first, second) {
        // return second[1] - first[1];
        return new Number(second[1]).valueOf() - new Number(first[1]).valueOf();
    });
    //console.log(items);
    return items;
};
exports.nextBoardAlgo = function (board, currColor, newColor) {
    var newBoard = [];
    newBoard = __spreadArrays(board);
    var maxJ = 0;
    for (var i = 0; i < newBoard.length; i++) {
        for (var j = 0; j < newBoard[i].length; j++) {
            if (newBoard[i][j] == 'X') {
                newBoard[i][j] = newColor;
                if (j > maxJ) {
                    maxJ = j;
                }
            }
        }
    }
    colourMovesArr.push(newColor);
    return { newBoard: newBoard, maxJ: maxJ };
};
exports.nextMove = function (board, coloursHashTable, colour1, colour2) {
    var tempBoard = [];
    tempBoard = __spreadArrays(board);
    var col = 0;
    var markDetails = exports.markConnTilesByColourAlgo(tempBoard, 0, col, colour2, 0, 0);
    var newBoardDetails = exports.nextBoardAlgo(tempBoard, "", colour1);
    return newBoardDetails.newBoard;
};
exports.finalBoardAlgo = function (board, coloursHashTable) {
    var tempBoard = [];
    tempBoard = __spreadArrays(board);
    var cols = tempBoard[0].length;
    var newBoardDetails = {
        newBoard: tempBoard,
        maxJ: 0
    };
    var markDetails;
    var col = 0;
    var k = 0;
    var previousColour1 = "";
    var firstloop = true;
    console.log("Original Board:");
    console.log(board);
    while (k < board[0].length) {
        chosenColours = exports.getMostPopularColorInColumnAlgo(tempBoard, coloursHashTable, k);
        if (chosenColours.coloursHashTable[chosenColours.colourNo1] == board.length) {
            k += 1;
            continue;
        }
        if (firstloop)
            markDetails = exports.markConnTilesByColourAlgo(tempBoard, 0, col, chosenColours.colourNo2, 0, 0);
        else
            markDetails = exports.markConnTilesByColourAlgo(tempBoard, 0, col, previousColour1, 0, 0);
        firstloop = false;
        if (previousColour1 == chosenColours.colourNo1) {
            newBoardDetails = exports.nextBoardAlgo(tempBoard, "", chosenColours.colourNo2);
            previousColour1 = chosenColours.colourNo2;
        }
        else {
            newBoardDetails = exports.nextBoardAlgo(tempBoard, "", chosenColours.colourNo1);
            previousColour1 = chosenColours.colourNo1;
        }
        console.log("Colour Chosen: " + previousColour1);
        console.log("New Board: ");
        console.log(newBoardDetails);
        if (k == board[0].length - 1) {
            k = 0;
        }
        else {
            k += 1;
        }
    }
    return newBoardDetails.newBoard;
};
