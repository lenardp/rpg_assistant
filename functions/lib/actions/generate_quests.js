"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestModule = require("request");
const NUMBER_ARGUMENT = 'number';
const GENERATOR_URL = 'http://donjon.bin.sh/fantasy/random/rpc.cgi?type=Quest';
function randomQuest(app, num, callback) {
    console.log("look at my num:  " + num);
    const url = GENERATOR_URL + '&n=' + num;
    console.log("look at my url:  " + url);
    requestModule.get(url, (error, resp, body) => {
        console.log("look at my body");
        console.log(body);
        console.log("look at my resp");
        console.log(resp);
        console.log("look at my error");
        console.log(error);
        //google doesn't let us contact external apis :(
        //const json = JSON.parse(body);
        const json = [];
        for (let i = 0; i < num; i++) {
            json.push(i + ' get out of my personal space');
        }
        callback(app, json);
    });
}
function sendResponse(app, questArray) {
    let fullMessage = "Hey bitch, here are your quests...";
    for (const quest of questArray) {
        fullMessage += '... ' + quest;
    }
    app.tell(fullMessage);
}
exports.generateQuests = (app) => {
    let num = app.getArgument(NUMBER_ARGUMENT);
    if (typeof num !== 'number') {
        num = 1;
    }
    randomQuest(app, num, sendResponse);
};
//# sourceMappingURL=generate_quests.js.map