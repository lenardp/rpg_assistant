import * as requestModule from 'request';
import { DialogflowApp as App } from 'actions-on-google';

const NUMBER_ARGUMENT = 'number';
const GENERATOR_URL = 'http://donjon.bin.sh/fantasy/random/rpc.cgi?type=Location';
const TYPE_ARGUMENT = 'location_type';

function randomLocation(app: App, num: number, locType: string, callback: (app1: App, ary: string[]) => void) {
  console.log("randomLocation");
  console.log("locType " + locType);
  console.log("num " + num);
  const url = GENERATOR_URL + '&loc_type=' + locType + '&n=' + num;
  console.log("url " + url);

  requestModule.get(url, (error, resp, body) => {
    console.log("requestModule");
    const json = JSON.parse(body);
    callback(app, json);
  });
}

function sendResponse(app, questArray) {
  console.log("sendResponse");
  const conjunction = "Here's another:  ";

  let quest, fullMessage;
  for (let i=0; i<questArray.length; i++) {
    quest = questArray[i];
    if (i > 0) {
      fullMessage = conjunction + quest;
    } else {
      fullMessage = quest;
    }
    app.tell(fullMessage);
  }
}

export const generateLocation = (app: App) => {
  console.log("generateLocation");
    let num = app.getArgument(NUMBER_ARGUMENT);
    if (typeof num !== 'number') {
      num = 1;
    }

    let locType = app.getArgument(TYPE_ARGUMENT);
    if (typeof locType !== 'string') {
      locType = '';
    }

    randomLocation(app, num, locType, sendResponse);
};
