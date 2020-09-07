import Tile, { ITile } from './Tile';
import { Dict } from './types';
import { IPlayable } from './Playable';
export interface IBoard {
    rows: number;
    columns: number;
    tiles: ITile[][];

}

class Board implements IBoard, IPlayable {

    public rows: number = 0;
    public columns: number = 0;
    public tiles: ITile[][] = [];
    //public initialBoard: IBoard;
    //public boardTransitions: { chosenColour: string, newBoard: IBoard }[];

    //public boardTransitions: { chosenColour: string, board: IPlayable }[] = [];
    //public colourPalette: string[] = ["#fb1700", "#f8dd7d", "#95c4cc"];
    public colourPalette: string[] = ["red", "blue", "green"];
    public coloursHashTable: Dict = {};
    constructor(rows: number, columns: number, tiles?: ITile[][], colourPalette?: string[]) {
        this.rows = rows;
        this.columns = columns
        if (tiles) {
            this.tiles = tiles;
        }

        if (colourPalette) {
            this.colourPalette = colourPalette;
        }
        this.NewBoard();
        //this.initialBoard = this;
    }
    public NewBoard(): void {
        let id: number = 1;

        this.tiles = new Array();

        if (this.rows > 0 && this.columns > 0) {
            for (var i = 0; i < this.rows; i++) {
                this.tiles[i] = new Array();
                for (var j = 0; j < this.columns; j++) {
                    this.tiles[i][j] = new Tile(String(id++), this.getRandomArrayItem(this.colourPalette), i, j);
                }
            }
        }
    }
    private getRandomArrayItem(items: string[]) {
        return items[Math.floor(Math.random() * items.length)];
    }
}

export default Board;

