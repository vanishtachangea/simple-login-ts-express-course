import { IBoard } from './Board';
import {Dict} from './types';
import { ITile } from './Tile';
//How can you be an argument to nextBoard
export interface IPlayable {
   // initialBoard: IBoard;
    colourPalette:string[];
    tiles :ITile[][];
    //boardTransitions: { chosenColour: string, board: IPlayable }[];
    NewBoard():void;   
    coloursHashTable: Dict; 
}
export default IPlayable;