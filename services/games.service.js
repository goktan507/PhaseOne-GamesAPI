const axios = require('axios');
const csvwriter = require('csv-writer');
const e = require('express');

let createCsvWriter = csvwriter.createObjectCsvWriter

let title_match_start;


exports.getAllGames = (req, res) => {
    axios.get('https://r5-crossplay.r5prod.stryder.respawn.com/privatematch/?token=' + req.params.lobbycode)
        .then((response) => {
            let results = [];
            let playerResults;
            (response.data.matches).forEach(element => {    
                playerResults = [];
                element.player_results.forEach(pResult => {
                    playerResults.push({
                        "kills": pResult.kills,
                        "characterName": pResult.characterName,
                        "playerName": pResult.playerName,
                        "assists": pResult.assists,
                        "teamPlacement": pResult.teamPlacement,
                        "damageDealt": pResult.damageDealt,
                        "teamNum": pResult.teamNum,
                        "teamName": pResult.teamName,
                        "survivalTime": pResult.survivalTime
                    });
                });
                results.push(
                    {
                        "match_start": element.match_start,
                        "player_results": playerResults
                    }
                )
            });
            res.json(results);
            // csvWriter
            //     .writeRecords(results)
            //     .then(() => console.log('Data uploaded into csv successfully'));
        })
        .catch((e) => {
            console.log(e);
        })
}

exports.getOneGame = (req, res) => {
    axios.get('https://r5-crossplay.r5prod.stryder.respawn.com/privatematch/?token=' + req.params.lobbycode)
        .then((response) => {
            let results = [];
            let playerResults = [];
            let csvResults = [];
            response.data.matches[0].player_results.forEach(pResult => {
                playerResults.push({
                    "kills": pResult.kills,
                    "characterName": pResult.characterName,
                    "playerName": pResult.playerName,
                    "assists": pResult.assists,
                    "teamPlacement": pResult.teamPlacement,
                    "damageDealt": pResult.damageDealt,
                    "teamNum": pResult.teamNum,
                    "teamName": pResult.teamName,
                    "survivalTime": pResult.survivalTime
                });
                csvResults.push({
                    "match_start": response.data.matches[0].match_start,
                    "kills": pResult.kills,
                    "characterName": pResult.characterName,
                    "playerName": pResult.playerName,
                    "assists": pResult.assists,
                    "teamPlacement": pResult.teamPlacement,
                    "damageDealt": pResult.damageDealt,
                    "teamNum": pResult.teamNum,
                    "teamName": pResult.teamName,
                    "survivalTime": pResult.survivalTime
                })
            });
            results.push(
                {
                    "match_start": response.data.matches[0].match_start,
                    "player_results": playerResults
                }
            );
            let date = new Date(response.data.matches[0].match_start*1000).toLocaleString();
            const csvWriter = createCsvWriter({
                path: 'games.csv',
                header: [
                    { title: date },
                    { id: "kills", title: "kills" },
                    { id: "characterName", title: "characterName" },
                    { id: "playerName", title: "playerName" },
                    { id: "assists", title: "assists" },
                    { id: "teamPlacement", title: "teamPlacement" },
                    { id: "damageDealt", title: "damageDealt" },
                    { id: "teamNum", title: "teamNum" },
                    { id: "teamName", title: "teamName" },
                    { id: "survivalTime", title: "survivalTime" },
                ]
            });
            res.json(results);
            csvWriter
                .writeRecords(results[0].player_results)
                .then(() => console.log('Data uploaded into csv successfully'));
        })
        .catch((e) => {
            console.log(e);
        })
}
