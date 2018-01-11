'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
process.env.DEBUG = 'actions-on-google:*';
const actions_on_google_1 = require("actions-on-google");
const functions = require("firebase-functions");
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
exports.rpgAssistant = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
    const app = new actions_on_google_1.DialogflowApp({ request, response });
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    function generateEncounter(app) {
        let number = app.getArgument(NUMBER_ARGUMENT);
        let color = app.getArgument(COLOR_ARGUMENT);
        let encounter = 'A wandering kobold accidentally triggers an arrow trap.';
        let fullMessage = "Hey bitch, here are your encounters:  ";
        for (let i = 0; i < number; i++) {
            fullMessage += ' ' + encounter;
        }
        app.tell(fullMessage);
    }
    // Essentially, this is our router
    let actionMap = new Map();
    actionMap.set(NAME_ACTION, generateEncounter);
    app.handleRequest(actionMap);
});
//# sourceMappingURL=index.js.map