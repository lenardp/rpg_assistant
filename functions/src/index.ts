'use strict';

process.env.DEBUG = 'actions-on-google:*';
import { DialogflowApp as App } from 'actions-on-google';
import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/functions/write-firebase-functions

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'generate_encounter';
// b. the parameters that are parsed from the make_name intent 
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// Typescript way
export const rpgAssistant = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");

  const app = new App({request, response});

  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function generateEncounter(app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let color = app.getArgument(COLOR_ARGUMENT);

    let encounter = 'A wandering kobold accidentally triggers an arrow trap.'

    let fullMessage = "Hey bitch, here are your encounters:  ";

    for (let i=0; i < number; i++) {
      fullMessage += ' ' + encounter;
    }

    app.tell(fullMessage);
  }

  // Essentially, this is our router
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, generateEncounter);

  app.handleRequest(actionMap);
});



/**************/
// The node javascript way

//exports.sillyNameMaker = functions.https.onRequest((request, response) => {
//  //declare a new dialogflow app from google
//  const app = new App({request, response});
//
//  // Just show us the qrequest
//  console.log('Request headers: ' + JSON.stringify(request.headers));
//  console.log('Request body: ' + JSON.stringify(request.body));
//
//
//// c. The function that generates the silly name
//  function makeName (app) {
//    // getting args
//    let number = app.getArgument(NUMBER_ARGUMENT);
//    let color = app.getArgument(COLOR_ARGUMENT);
//    app.tell('Alright, your silly name is ' +
//      color + ' ' + number +
//      '! I hope you like it. See you next time.');
//  }
//  // d. build an action map, which maps intent names to functions
//  let actionMap = new Map();
//  actionMap.set(NAME_ACTION, makeName);
//
//app.handleRequest(actionMap);
//});
