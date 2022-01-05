const service = require("../services/games.service");

exports.getAllGames = (req, res, next) => {
    service.getAllGames(req, res, (error, results) => {
        if(error) {
            return res.status(400).send({success: 0, data: "Bad Request"});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.getOneGame = (req, res, next) => {
    service.getOneGame(req, res, (error, results) => {
        if(error) {
            return res.status(400).send({success: 0, data: "Bad Request"});
        }
        return res.status(200).send({success: 1, data: results});
    });
}

exports.downloadGame = (req, res, next) => {
    service.downloadGame(req, res, (error, results) => {
        if(error) {
            return res.status(400).send({success: 0, data: "Bad Request"});
        }
        return res.status(200).send({success: 1, data: results});
    });
}