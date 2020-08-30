import { Router, Request, Response, NextFunction } from 'express';


interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}
function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}

const router = Router();


router.get('/', (req: Request, res: Response) => {
    //res.send(`<h1>Welcome</h1>`);
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
        <div>You are logged in </div>
        <a href="/logout">Logout</a>
        </div>
        `)
    }
    else {
        res.send(`
        <div>
        <div>You are NOT logged in </div>
        <a href="/login">Log In</a>
        </div>
        `)
    }
})
router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;
    if (email && password && email === 'hi@vc.com' && password === 'pw') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }

    else
        res.send("Invalid email or password");
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = { loggedIn: undefined };
    res.redirect('/login');

});

router.get('/protected', requireAuth, (req:Request, res:Response )=>{
    res.send('Welcome to Protected Page, ');
})

export { router };