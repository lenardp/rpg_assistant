import { DialogflowApp as App } from 'actions-on-google';
const PREMISES = require('../../configs/quest_premises');
const SPARKS = require('../../configs/fantasy_sparks');

const SPARK_NUMBER_ARG = 'sparks';

function randomChoice(ary: any[]) {
  const index = Math.floor( Math.random() * ary.length );
  return ary[index];
}

function randomPremise() {
  return randomChoice(PREMISES);
}

function randomSparks(num: number) {
  const sparks = [];
  for (let i=0; i < num; i++) {
    sparks.push(randomChoice(SPARKS));
  }
  return sparks;
}

function assembleSeed(premise: string, sparks: string[]) {
  let last = sparks[sparks.length-1];
  sparks[sparks.length-1] = 'and ' + last;
  return "How about a " + premise + " involving " + sparks.join(', ') + "?";
}

export const generateQuestSeed = (app: App) => {
  console.log('generateQuestSeed');

  // A quest seed is made up of...
  // premise
  const premise = randomPremise();

  console.log('premise: ' + premise);

  // a tie-in
  // TODO save this for when we can insert into db
  //const random

  // sparking keywords
  let numSparks = app.getArgument(SPARK_NUMBER_ARG);
  if (typeof numSparks !== 'number' || numSparks < 1 || numSparks > 10) {
    numSparks = 3;
  }

  console.log('numSparks: ' + numSparks);

  const sparks = randomSparks(numSparks);

  const response = assembleSeed(premise, sparks);

  app.tell(response);
}
