const gamesController = require("../controllers/games.controller");
var express = require("express");
const res = require("express/lib/response");

const router = express.Router();

router
    .get('/games/:lobbycode', gamesController.getAllGames)
    .get('/game/:lobbycode', gamesController.getOneGame)
    .get('/download/:lobbycode', gamesController.downloadGame);

module.exports = router;