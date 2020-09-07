
import { IPlayable } from '../../entities/Playable';
import IBoard from '../../entities/Board';
import ITile from '../../entities/Tile';
import Board from '../../entities/Board';
import { Dict } from '../../entities/types';
class GameServicesClass {

    public board: IPlayable;
    public originalBoard: IPlayable;
    //public newBoard: Board;
    private tileMarkedCount = 0;
    private tileMarkedMaxJ = 0;
    private chosenColour1 = "";
    private chosenColour2 = "";
    private previousColour1 = "";
    private firstLoop = false;
    public boardTransitions: { chosenColour: string, board: IPlayable }[] = [];
    private col = 0;
    private k = 0;
    constructor(board: IPlayable) {
        this.board = board;
        this.originalBoard = this.board;
        //this.newBoard = this.board;
        this.boardTransitions[0] = { chosenColour: "", board: this.board };
    }
    public getfinalBoard(): IPlayable {
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
        let col = this.col;

        while (this.k < this.board.tiles[0].length) {
            this.getMostPopularColorInColumnAlgo();
            // if(this.k==1)
            //break;
            console.log("this.chosenColour1: "+this.chosenColour1);
            console.log("this.k: "+this.k);
            console.log("this.board.coloursHashTable[this.chosenColour1]"+this.board.coloursHashTable[this.chosenColour1]);
            
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
    }

    public markConnTilesByColourAlgo(i: number, j: number) {
        //console.log("Inside markConnTilesByColourAlgo");

        let color: string = "";
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
    }

    public getMostPopularColorInColumnAlgo() {
        //let tempBoard: ITile[][] = [];
        //tempBoard = [...this.board.tiles];
        // let tempboard4 = [...this.board.tiles];
        this.board.coloursHashTable = {};
        for (let i = 0; i < this.board.tiles.length; i++) {
            let colour = this.board.tiles[i][this.k].colour;
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

    }

    public getChosenColorsAlgo() {
        //console.log("Inside getChosenColorsAlgo");
        const dict_sorted = this.sortDictionary();
        //console.log(dict_sorted);
        this.chosenColour1 = dict_sorted[0] == undefined ? "" : String(dict_sorted[0][0]);
        this.chosenColour2 = dict_sorted[1] == undefined ? "" : String(dict_sorted[1][0]);
        //coloursHashTable: coloursHashTable
        //console.log(this.chosenColour1);
        //console.log(this.chosenColour2);
        // return chosenColours;
    }
    public sortDictionary(): (string | number)[][] {
        let dict = this.board.coloursHashTable;
        // Create items array
        const items = Object.keys(dict).map(function (key) {
            return [key, dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first: (string | number)[], second: (string | number)[]): number {
            // return second[1] - first[1];
            return new Number(second[1]).valueOf() - new Number(first[1]).valueOf();
        });
        ////console.log(items);
        return items;
    }
    public nextBoardAlgo() {
        // let newBoard: string[][] = [];
        // newBoard = [...board];
        //let maxJ = 0;
        let newColor: string = "";

        if (this.previousColour1 == this.chosenColour1) {
            newColor = this.chosenColour2;
            this.previousColour1 = this.chosenColour2;
        }
        else {
            newColor = this.chosenColour1;
            this.previousColour1 = this.chosenColour1;
        }

        for (let i = 0; i < this.board.tiles.length; i++) {
            for (let j = 0; j < this.board.tiles[i].length; j++) {
                if (this.board.tiles[i][j].isMarked) {
                    this.board.tiles[i][j].colour = newColor;
                    console.log("this.board.tiles[i][j].colour"+this.board.tiles[i][j].colour);
                    if (j > this.tileMarkedMaxJ) {
                        this.tileMarkedMaxJ = j;
                    }
                }
            }
        }
        //colourMovesArr.push(newColor);
        //return { newBoard, maxJ };
        this.boardTransitions.push({ chosenColour: newColor, board: this.board })
    }
}
export default GameServicesClass;
///////////////////////////////////////////////////////////////////////////





