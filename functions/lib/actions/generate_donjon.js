"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestModule = require("request");
const FANTASY_CHOICES = require('../../configs/donjon_fantasy');
const SCIFI_CHOICES = require('../../configs/donjon_scifi');
const DONJON_CHOICES = {
    'fantasy': FANTASY_CHOICES,
    'scifi': SCIFI_CHOICES
};
const DONJON_URL = 'http://donjon.bin.sh/';
const ACTION_NAME = 'generate_plot_point';
const sanitizeArgs = (app, permitted) => {
    const newObj = {};
    if (!permitted) {
        return {};
    }
    for (const key in permitted) {
        if (!!app.getArgument(key)) {
            const val = app.getArgument(key).toLowerCase();
            const choices = permitted[key].map(x => x.toLowerCase());
            if (choices.indexOf(val) > -1) {
                const ind = choices.indexOf(val);
                const cleanChoice = permitted[key][ind];
                newObj[key] = cleanChoice;
            }
        }
    }
    return newObj;
};
const makeUrl = (app, suite, genType) => {
    const permittedChoices = DONJON_CHOICES[suite][genType];
    const cleanParams = sanitizeArgs(app, permittedChoices);
    const paramStrs = ['n=1'];
    for (const key in cleanParams) {
        paramStrs.push(key + '=' + encodeURIComponent(cleanParams[key]));
    }
    const fullParamsStr = paramStrs.join('&');
    return DONJON_URL + suite + '/random/rpc.cgi?type=' + genType + '&' + fullParamsStr;
};
const queryDonjon = (app, suite, genType, paramSelection) => {
    const url = makeUrl(app, suite, genType);
    console.log("Making request to: " + url);
    requestModule.get(url, (error, resp, body) => {
        const json = JSON.parse(body);
        app.tell(json[0]);
    });
};
// Creating the action map for export
exports.ACTION_MAP = {};
const initActionMap = () => {
    for (const suite in DONJON_CHOICES) {
        for (const genType in DONJON_CHOICES[suite]) {
            const fullActionName = ACTION_NAME + '.' + suite + '-' + genType;
            exports.ACTION_MAP[fullActionName] = (app) => {
                queryDonjon(app, suite, genType, DONJON_CHOICES[suite][genType]);
            };
        }
    }
};
initActionMap();
//# sourceMappingURL=generate_donjon.js.map