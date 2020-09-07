import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request has been made');
    next();
}


@controller('')
class RootController {
    @get('/')
    @use(logger)
    getRoot(req: Request, res: Response) {
        res.send(`
            <div>
            <div>Welcome to a very Popular Game</div>
            <a href="/game/board">Start Game</a>
            <div>brought to you by Everreal</div>
            </div>
            `)

    }

}