import express from 'express';

import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import {AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';
import './controllers/GameController';
var path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({keys:['log']}));
app.use(AppRouter.getInstance());
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})
export default app;