import {IPlayable} from './Playable';
import GameServicesClass from '../services/game/GameServicesClass';
export interface IGame {
    name: string;
}

class Game implements IGame {

    public name: string;

    constructor(name: string) {
        this.name = name;

    }
    public start(iplayable:IPlayable):void{
        iplayable.NewBoard();
    }
    public nextMove(iplayable:IPlayable, colour:string):void{

    }
    public allAIMoves(iplayable:IPlayable, colour:string):void{
      //  GameServicesClass.getfinalBoard(iplayable);
    }
}

export default Game;
