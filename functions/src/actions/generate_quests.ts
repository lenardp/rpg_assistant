import * as requestModule from 'request';
import { DialogflowApp as App } from 'actions-on-google';

const NUMBER_ARGUMENT = 'number';
const GENERATOR_URL = 'http://donjon.bin.sh/fantasy/random/rpc.cgi?type=Quest';

function randomQuest(app: App, num: number, callback: (app1: App, ary: string[]) => void) {
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

export const generateQuests = (app: App) => {
    let num = app.getArgument(NUMBER_ARGUMENT);
    if (typeof num !== 'number') {
      num = 1;
    }

    randomQuest(app, num, sendResponse);
};
