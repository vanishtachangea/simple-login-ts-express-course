import { Request, Response, NextFunction } from 'express';
/* import { get } from './decorators/routes';
import { controller } from './decorators/controller'; */
import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request has been made');
    next();
}

@controller('/auth')
class LoginController {
    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>
       `)
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;
        if (email && password && email === 'hi@vc.com' && password === 'pw') {
            req.session = { loggedIn: true };
            res.redirect('/');
        }
        else
            res.send("Invalid email or password");
    };

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = { loggedIn: undefined };
        res.redirect('/auth/login');
    };
}