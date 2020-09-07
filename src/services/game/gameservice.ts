
///////////////////////////////////////////////////////////////////////////
export type Dict = { [key: string]: number };
export interface ChosenColours {
    colourNo1: string;
    colourNo2: string;
    coloursHashTable: Dict;
}
let chosenColours: ChosenColours;
export interface NewBoardDetails {
    newBoard: string[][];
    maxJ: number;
}
export interface TileMarkDetails {
    markedCount: number;
    maxJ: number;
}
const colourMovesArr: string[] = [];
///////////////////////////////////////////////////////////////////////////

export const getMostPopularColorInColumnAlgo = (board: string[][], coloursHashTable: Dict, col: number): ChosenColours => {
    let tempBoard: string[][] = [];
    tempBoard = [...board];
    let tempboard4 = [...board];
    coloursHashTable = {};
    for (let i = 0; i < board.length; i++) {
        let colour = tempboard4[i][col];
        if (coloursHashTable[colour] == undefined) {
            coloursHashTable[colour] = 1;
        }
        else {
            coloursHashTable[colour] += 1;
        }
    }
    chosenColours = getChosenColorsAlgo(coloursHashTable);
    return chosenColours;
}


let tileMarkDetails: TileMarkDetails = {
    markedCount: 0,
    maxJ: 0
}
export const markConnTilesByColourAlgo = (board: string[][], i: number, j: number, color: string, count: number, maxJ: number): TileMarkDetails => {
    if (board[i][j] == color) {
        count = count + 1;
        board[i][j] = 'X';
        tileMarkDetails.maxJ = j > tileMarkDetails.maxJ ? j : tileMarkDetails.maxJ;
        tileMarkDetails.markedCount = count;

        if (j < board[0].length - 1) {
            tileMarkDetails = markConnTilesByColourAlgo(board, i, j + 1, color, count, maxJ);
        }
        if (j >= 1) {
            tileMarkDetails = markConnTilesByColourAlgo(board, i, j - 1, color, count, maxJ);
        }
        if (i < board.length - 1) {
            tileMarkDetails = markConnTilesByColourAlgo(board, i + 1, j, color, count, maxJ);
        }

        if (i >= 1) {
            tileMarkDetails = markConnTilesByColourAlgo(board, i - 1, j, color, count, maxJ);
        }
    }
    else {
        if (i < board.length - 1 && j == 0) {
            tileMarkDetails = markConnTilesByColourAlgo(board, i + 1, j, color, count, maxJ);
        }
    }
    return tileMarkDetails;
}
export const getChosenColorsAlgo = (coloursHashTable: Dict): ChosenColours => {
    const dict_sorted = sortDictionary(coloursHashTable);
    chosenColours = {
        colourNo1: dict_sorted[0] == undefined ? "" : String(dict_sorted[0][0]),
        colourNo2: dict_sorted[1] == undefined ? "" : String(dict_sorted[1][0]),
        coloursHashTable: coloursHashTable
    }
    return chosenColours;
}
export const sortDictionary = (dict: Dict): (string | number)[][] => {
    // Create items array
    const items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first: (string | number)[], second: (string | number)[]): number {
        // return second[1] - first[1];
        return new Number(second[1]).valueOf() - new Number(first[1]).valueOf();
    });
    //console.log(items);
    return items;
}


export const nextBoardAlgo = (board: string[][], currColor: string, newColor: string): NewBoardDetails => {
    let newBoard: string[][] = [];
    newBoard = [...board];
    let maxJ = 0;
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
            if (newBoard[i][j] == 'X') {
                newBoard[i][j] = newColor;
                if (j > maxJ) {
                    maxJ = j;
                }
            }
        }
    }
    colourMovesArr.push(newColor);
    return { newBoard, maxJ };
}
export const nextMove=(board:string[][], coloursHashTable: Dict, colour1:string, colour2:string): string[][] =>{
    let tempBoard: string[][] = [];
    tempBoard = [...board];
    const col =0;
    const markDetails= markConnTilesByColourAlgo(tempBoard, 0, col, colour2, 0, 0);
    const newBoardDetails = nextBoardAlgo(tempBoard, "", colour1);
    return newBoardDetails.newBoard;  
}
export const finalBoardAlgo = (board: string[][], coloursHashTable: Dict): string[][] => {
    let tempBoard: string[][] = [];
    tempBoard = [...board];
    const cols = tempBoard[0].length;
    let newBoardDetails: NewBoardDetails = {
        newBoard: tempBoard,
        maxJ: 0
    };
    let markDetails: TileMarkDetails;
    let col = 0;
    let k = 0;
    let previousColour1 = "";
    let firstloop = true;
    console.log("Original Board:");
    console.log(board);
    while (k < board[0].length) {
        chosenColours = getMostPopularColorInColumnAlgo(tempBoard, coloursHashTable, k);

        if (chosenColours.coloursHashTable[chosenColours.colourNo1] == board.length) {
            k += 1;
            continue;
        }
        if (firstloop)
            markDetails = markConnTilesByColourAlgo(tempBoard, 0, col, chosenColours.colourNo2, 0, 0);
        else
            markDetails = markConnTilesByColourAlgo(tempBoard, 0, col, previousColour1, 0, 0);
        firstloop = false;
        if (previousColour1 == chosenColours.colourNo1)
        {
            newBoardDetails = nextBoardAlgo(tempBoard, "", chosenColours.colourNo2);
            previousColour1 = chosenColours.colourNo2;
        }            
        else
        {
            newBoardDetails = nextBoardAlgo(tempBoard, "", chosenColours.colourNo1);
            previousColour1 = chosenColours.colourNo1;
        }
            
       
        console.log("Colour Chosen: "+previousColour1)
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
}



