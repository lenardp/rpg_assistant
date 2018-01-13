'use strict';

process.env.DEBUG = 'actions-on-google:*';
import { DialogflowApp as App } from 'actions-on-google';
import * as functions from 'firebase-functions';
//import * as LocationGenerator from './actions/generate_location';
//import * as QuestGenerator from './actions/generate_quests';
import * as QuestSeedGenerator from './actions/generate_quest_seed';
import * as PlotPointGenerator from './actions/generate_donjon';
import * as NameGenerator from './actions/generate_name';
const merge = require('merge-descriptors');

let ACTION_MAP = {
  //  'generate_quest': QuestGenerator.generateQuests,
  //  'generate_location': LocationGenerator.generateLocation,
  'generate_quest_seeds': QuestSeedGenerator.generateQuestSeed
}
ACTION_MAP = merge(ACTION_MAP, PlotPointGenerator.ACTION_MAP);
ACTION_MAP = merge(ACTION_MAP, NameGenerator.ACTION_MAP);

export const rpgAssistant = functions.https.onRequest((request, response) => {
  const rpgApp = new App({request, response});

  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Essentially, this is our router
  const actionMap = new Map();

  for (const actionName in ACTION_MAP) {
    actionMap.set(actionName, ACTION_MAP[actionName]);
  }

  rpgApp.handleRequest(actionMap);
});
