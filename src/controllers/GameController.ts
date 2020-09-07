import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
import Board from '../entities/Board';
import IPlayable from '../entities/Playable';
import GameServicesClass from '../services/game/GameServicesClass';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request has been made');
    next();
}

@controller('/game')
class GameController {


    @get('/board')
    @use(logger)
    getBoard(req: Request, res: Response): void {
        console.log("bd inside GetBoard Game controller");
        let bd: IPlayable = new Board(2, 2);
        console.log("Before calling Get final Board");
        for (let i = 0; i < bd.tiles.length; i++) {
            for (let j = 0; j < bd.tiles[i].length; j++) {
                console.log("("+i+","+j+") "+bd.tiles[i][j].colour);
            }
        }
        //console.log(bd);


        let gameService = new GameServicesClass(bd);
       
        bd = gameService.getfinalBoard();
        console.log("After calling Get final Board");
        //console.log(bd);
        for (let i = 0; i < bd.tiles.length; i++) {
            for (let j = 0; j < bd.tiles[i].length; j++) {
                console.log(bd.tiles[i][j].colour);
            }
        }
        res.send(`
        <form method="POST">
 <div>
      
      </div>
            <button>Play</button>
        </form>
       `)

    }

    @post('/board')
    //@bodyValidator('email', 'password')
    postBoard(req: Request, res: Response) {
        const { email, password } = req.body;
        if (email && password && email === 'hi@vc.com' && password === 'pw') {
            //req.session = { loggedIn: true };
            res.redirect('/');
        }
        else
            res.send("Invalid email or password");
    };

    @post('/play')
    //@bodyValidator('email', 'password')
    postPlay(req: Request, res: Response) {
        const { email, password } = req.body;
        if (email && password && email === 'hi@vc.com' && password === 'pw') {
            //req.session = { loggedIn: true };
            res.redirect('/');
        }
        else
            res.send("Invalid email or password");
    };
}