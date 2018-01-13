"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestModule = require("request");
const NAMES = require('../../configs/donjon_name');
const generateName = (app) => {
    let url = "http://donjon.bin.sh/name/rpc.cgi?";
    let num = app.getArgument("number");
    if (isNaN(num) || num < 1) {
        num = 1;
    }
    let nameType = app.getArgument("name_type").toLowerCase();
    const choices = NAMES.map(x => x.toLowerCase());
    if (choices.indexOf(nameType) > -1) {
        const ind = choices.indexOf(nameType);
        const cleanChoice = NAMES[ind];
        nameType = cleanChoice;
        url = url + "type=" + nameType.replace(' ', '+') + "&n=" + num;
        requestModule.get(url, (error, resp, body) => {
            const names = body.split(/\n/);
            app.tell("How about " + names.join('... or '));
        });
    }
    else {
        app.tell("I don't know how to make the name of a " + nameType);
    }
};
exports.ACTION_MAP = {
    'generate_name': generateName
};
//# sourceMappingURL=generate_name.js.map