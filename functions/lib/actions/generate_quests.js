"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestModule = require("request");
const NUMBER_ARGUMENT = 'number';
const GENERATOR_URL = 'http://donjon.bin.sh/fantasy/random/rpc.cgi?type=Quest';
function randomQuest(app, num, callback) {
    const url = GENERATOR_URL + '&n=' + num;
    requestModule.get(url, (error, resp, body) => {
        const json = JSON.parse(body);
        callback(app, json);
    });
}
function sendResponse(app, questArray) {
    const conjunction = "... Here's another:  ";
    const fullMessage = questArray.join(conjunction);
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