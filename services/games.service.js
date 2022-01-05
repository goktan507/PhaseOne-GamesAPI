const axios = require('axios');
const csvwriter = require('csv-writer');
const { json } = require('express');
const e = require('express');
var { Parser } = require('json2csv');

let createCsvWriter = csvwriter.createObjectCsvWriter


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
            let date = new Date(response.data.matches[0].match_start * 1000).toLocaleString();
            // const csvWriter = createCsvWriter({
            //     path: 'games.csv',
            //     header: [  
            //         { title: date },
            //         { id: "kills", title: "kills" },
            //         { id: "characterName", title: "characterName" },
            //         { id: "playerName", title: "playerName" },
            //         { id: "assists", title: "assists" },
            //         { id: "teamPlacement", title: "teamPlacement" },
            //         { id: "damageDealt", title: "damageDealt" },
            //         { id: "teamName", title: "teamName" },
            //         { id: "survivalTime", title: "survivalTime" },
            //     ]
            // });

            // csvWriter
            //     .writeRecords(results[0].player_results)
            //     .then(() => console.log('Data uploaded into csv successfully')); 
            res.json(results);
        })
        .catch((e) => {
            console.log(e);
        })
}

exports.downloadGame = (req, res) => {
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
            let date = new Date(response.data.matches[0].match_start * 1000).toLocaleString();
            
            const fields = [{
                label: date,
                value: ''
            }, {
                label: 'kills',
                value: 'kills'
            }, {
                label: 'characterName',
                value: 'characterName'
            }, {
                label: 'playerName',
                value: 'playerName'
            }, {
                label: 'assists',
                value: 'assists'
            }, {
                label: 'teamPlacement',
                value: 'teamPlacement'
            }, {
                label: 'damageDealt',
                value: 'damageDealt'
            }, {
                label: 'teamName',
                value: 'teamName'
            }, {
                label: 'survivalTime',
                value: 'survivalTime'
            }];
            const json2csv = new Parser({ fields: fields });

            const csv = json2csv.parse(csvResults);
            res.attachment('game_results.csv');
            res.status(200).send(csv);

        })
        .catch((e) => {
            console.log(e);
        })
}