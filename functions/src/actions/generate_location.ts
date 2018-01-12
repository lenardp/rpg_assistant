import * as requestModule from 'request';
import { DialogflowApp as App } from 'actions-on-google';

const NUMBER_ARGUMENT = 'number';
const GENERATOR_URL = 'http://donjon.bin.sh/fantasy/random/rpc.cgi?type=Location';
const TYPE_ARGUMENT = 'location_type';

const typeMap = {
  'dungeon': 'Dungeon',
  'town': 'Town',
  'city': 'Town',
  'civilized': 'Town',
  'wilderness': 'Wilderness',
  'wild': 'Wilderness',
  'natural': 'Wilderness',
  'plane': 'World',
  'world': 'World'
}

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
  const conjunction = "... Here's another:  ";

  const fullMessage = questArray.join(conjunction);

  console.log("fullMessage: " + fullMessage);

  app.tell(fullMessage);
}

export const generateLocation = (app: App) => {
  console.log("generateLocation");
    let num = app.getArgument(NUMBER_ARGUMENT);
    if (typeof num !== 'number') {
      num = 1;
    }

    let locType = app.getArgument(TYPE_ARGUMENT);
    locType = typeMap[locType];
    if (typeof locType !== 'string') {
      locType = '';
    }

    randomLocation(app, num, locType, sendResponse);
};
