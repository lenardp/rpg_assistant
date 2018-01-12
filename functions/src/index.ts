'use strict';

process.env.DEBUG = 'actions-on-google:*';
import { DialogflowApp as App } from 'actions-on-google';
import * as functions from 'firebase-functions';
import * as LocationGenerator from './actions/generate_location';
import * as QuestGenerator from './actions/generate_quests';
import * as QuestSeedGenerator from './actions/generate_quest_seed';

const ACTION_MAP = {
  'generate_quest': QuestGenerator.generateQuests,
  'generate_location': LocationGenerator.generateLocation,
  'generate_quest_seeds': QuestSeedGenerator.generateQuestSeed
}

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
