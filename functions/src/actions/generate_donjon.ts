import { DialogflowApp as App } from 'actions-on-google';
import * as requestModule from 'request';

const FANTASY_CHOICES = require('../../configs/donjon_fantasy');

const DONJON_CHOICES = {
  'fantasy': FANTASY_CHOICES
}

const DONJON_URL = 'http://donjon.bin.sh/';
const ACTION_NAME = 'generate_plot_point';

const sanitizeArgs = (app: App, permitted: object) => {
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

const makeUrl = (app: App, suite: string, genType: string) => {
  const permittedChoices = DONJON_CHOICES[suite][genType];

  const cleanParams = sanitizeArgs(app, permittedChoices);

  const paramStrs = ['n=1'];
  for (const key in cleanParams) {
    paramStrs.push(key + '=' + encodeURIComponent(cleanParams[key]));
  }

  const fullParamsStr = paramStrs.join('&');

  return DONJON_URL + suite + '/random/rpc.cgi?type=' + genType + '&' + fullParamsStr;
}

const queryDonjon = (app: App, suite: string, genType: string, paramSelection: any) => {
  const url = makeUrl(app, suite, genType);

  console.log("Making request to: " + url);

  requestModule.get(url, (error, resp, body) => {
    const json = JSON.parse(body);
    app.tell(json[0]);
  });
}

// Creating the action map for export

export const ACTION_MAP = {}

const initActionMap = () => {
  for (const suite in DONJON_CHOICES) {
    for (const genType in DONJON_CHOICES[suite]) {
      const fullActionName = ACTION_NAME + '.' + suite + '-' + genType;
      ACTION_MAP[fullActionName] = (app: App) => {
        queryDonjon(app, suite, genType, DONJON_CHOICES[suite][genType]);
      }
    }
  }
};


initActionMap();
