import { DialogflowApp as App } from 'actions-on-google';
import * as requestModule from 'request';

const NAMES = require('../../configs/donjon_name');

const generateName = (app: App) => {
  let url = "http://donjon.bin.sh/name/rpc.cgi?"
  let num = app.getArgument("number");

  if (isNaN(num) || num < 1) {
    num = 1;
  }

  let nameType = app.getArgument("name_type").toLowerCase();

  const choices = NAMES.map(x => x.toLowerCase());
  if (choices.indexOf(nameType) > -1) {
    const ind = choices.indexOf(nameType);
    const cleanChoice = NAMES[ind];
    nameType = cleanChoice;

    url = url + "type=" + nameType.replace(' ', '+') + "&n=" + num;

    requestModule.get(url, (error, resp, body) => {
      const names = body.split(/\n/);

      app.tell("How about " + names.join('... or '));
    });
  } else {
    app.tell("I don't know how to make the name of a " + nameType);
  }
};

export const ACTION_MAP = {
  'generate_name': generateName
};
