const gamesController = require("../controllers/games.controller");
var express = require("express");

const router = express.Router();

router
    .get('/games/:lobbycode', gamesController.getAllGames)
    .get('/game/:lobbycode', gamesController.getOneGame);

module.exports = router;