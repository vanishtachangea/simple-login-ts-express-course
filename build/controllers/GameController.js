"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var Board_1 = __importDefault(require("../entities/Board"));
var GameServicesClass_1 = __importDefault(require("../services/game/GameServicesClass"));
function logger(req, res, next) {
    console.log('Request has been made');
    next();
}
var GameController = /** @class */ (function () {
    function GameController() {
    }
    GameController.prototype.getBoard = function (req, res) {
        console.log("bd inside GetBoard Game controller");
        var bd = new Board_1.default(2, 2);
        console.log("Before calling Get final Board");
        for (var i = 0; i < bd.tiles.length; i++) {
            for (var j = 0; j < bd.tiles[i].length; j++) {
                console.log("(" + i + "," + j + ") " + bd.tiles[i][j].colour);
            }
        }
        //console.log(bd);
        var gameService = new GameServicesClass_1.default(bd);
        bd = gameService.getfinalBoard();
        console.log("After calling Get final Board");
        //console.log(bd);
        for (var i = 0; i < bd.tiles.length; i++) {
            for (var j = 0; j < bd.tiles[i].length; j++) {
                console.log(bd.tiles[i][j].colour);
            }
        }
        res.send("\n        <form method=\"POST\">\n <div>\n      \n      </div>\n            <button>Play</button>\n        </form>\n       ");
    };
    //@bodyValidator('email', 'password')
    GameController.prototype.postBoard = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email && password && email === 'hi@vc.com' && password === 'pw') {
            //req.session = { loggedIn: true };
            res.redirect('/');
        }
        else
            res.send("Invalid email or password");
    };
    ;
    //@bodyValidator('email', 'password')
    GameController.prototype.postPlay = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email && password && email === 'hi@vc.com' && password === 'pw') {
            //req.session = { loggedIn: true };
            res.redirect('/');
        }
        else
            res.send("Invalid email or password");
    };
    ;
    __decorate([
        decorators_1.get('/board'),
        decorators_1.use(logger),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], GameController.prototype, "getBoard", null);
    __decorate([
        decorators_1.post('/board'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], GameController.prototype, "postBoard", null);
    __decorate([
        decorators_1.post('/play'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], GameController.prototype, "postPlay", null);
    GameController = __decorate([
        decorators_1.controller('/game')
    ], GameController);
    return GameController;
}());
