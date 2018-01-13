'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
process.env.DEBUG = 'actions-on-google:*';
const actions_on_google_1 = require("actions-on-google");
const functions = require("firebase-functions");
//import * as LocationGenerator from './actions/generate_location';
//import * as QuestGenerator from './actions/generate_quests';
const QuestSeedGenerator = require("./actions/generate_quest_seed");
const PlotPointGenerator = require("./actions/generate_donjon");
const NameGenerator = require("./actions/generate_name");
const merge = require('merge-descriptors');
let ACTION_MAP = {
    //  'generate_quest': QuestGenerator.generateQuests,
    //  'generate_location': LocationGenerator.generateLocation,
    'generate_quest_seeds': QuestSeedGenerator.generateQuestSeed
};
ACTION_MAP = merge(ACTION_MAP, PlotPointGenerator.ACTION_MAP);
ACTION_MAP = merge(ACTION_MAP, NameGenerator.ACTION_MAP);
exports.rpgAssistant = functions.https.onRequest((request, response) => {
    const rpgApp = new actions_on_google_1.DialogflowApp({ request, response });
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    // Essentially, this is our router
    const actionMap = new Map();
    for (const actionName in ACTION_MAP) {
        actionMap.set(actionName, ACTION_MAP[actionName]);
    }
    rpgApp.handleRequest(actionMap);
});
//# sourceMappingURL=index.js.map