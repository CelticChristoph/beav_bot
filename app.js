// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

// Discord bot
const { Client, RichEmbed } = require('discord.js');

// Mongo database
const mongo = require('mongodb');

// Assertions
const assert = require('assert');

// For URL fetching ES6 style.
const fetch = require('node-fetch');

// Router from ./routes
const routes = require('./routes/index');


// ----- Page Setup -----------------------------------------------------------
const app = express();
const discClient = new Client();

app.use('/', routes);

module.exports = app;

// ----- Bot Info -------------------------------------------------------------
const { token, ownerID, prefix } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);

// ----- Mongo Init -----------------------------------------------------------
const { MongoClient } = mongo;
const mongoURL = 'mongodb://localhost:27017'; // CHANGE?
const dbName = 'cludgeBot';
const mdbConfig = {
  useNewUrlParser: true,
};

// Create a new MongoClient
const mdbClient = new MongoClient(mongoURL, mdbConfig);
let mdb = null;

// Use connect method to connect to the Server
mdbClient.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to MongoDB server');

  mdb = mdbClient.db(dbName);

  // Call using a 'shutdown' function?
  // mdbClient.close();
});

// ----- Shared Functions------------------------------------------------------
function addUser() {
  mdb.collection('users').insertOne({ a: 1 }, (err, r) => {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
}

// ----- Bot Commands ---------------------------------------------------------
async function getLatestXKCD() {
  const url = 'http://xkcd.com/info.0.json';

  let latest = null;

  latest = await fetch(url)
    .then(r => r.json())
    .then(json => json.num)
    .catch(e => console.log(`Error in getLatestXKCD() with error:\n ${e}`));

  return latest;
}

async function embedXKCD(num) {
  let url = null;
  if (num === '0') {
    url = 'http://xkcd.com/info.0.json';
  } else if (num === '-1') {
    let max = 1;
    max = await getLatestXKCD()
      .catch(e => console.log(`Error in embedXKCD random branch with error:\n ${e}`));

    const rand = (Math.floor(Math.random() * Number(max)) + 1);

    url = `http://xkcd.com/${rand}/info.0.json`;
  } else {
    url = `http://xkcd.com/${num}/info.0.json`;
  }

  let embed = 'You shouldn\'t be seeing this.';

  await fetch(url)
    .then(r => r.json())
    .then((json) => {
      embed = new RichEmbed()
        .setTitle(`XKCD #${json.num} - ${json.safe_title}`)
        .setColor(0x00FF00)
        .setDescription(json.transcript)
        .setImage(json.img)
        .setFooter(json.alt);
    })
    .catch(e => console.log(`Error in getLatestXKCD() embed fetch with error:\n ${e}`));

  return embed;
}

async function parseCommand(msg) {
  const split = msg.content.substr(1).split(' ');
  const command = split[0];

  if (command === 'ping') {
    msg.reply('Pong!');
  }

  if (command === 'demo') {
    console.log(msg);
  }

  if (command === 'xkcd') {
    let message = 'Placeholder message.';
    if (split[1] === undefined) {
      message = await embedXKCD('0');
    } else if (split[1] === 'r') {
      message = await embedXKCD('-1');
    } else if (!Number.isNaN(split[1])) {
      message = await embedXKCD(split[1]);
    } else {
      message = 'Bad format. Usage is `!xkcd <num>` where num is any integer.';
    }
    console.log(`payload: ${message}`);
    msg.channel.send(message);
  }

  if (command === 'add') {
    addUser();
  }
}

discClient.on('ready', () => {
  console.log(`Logged in as ${discClient.user.tag}!`);
});

discClient.on('message', (msg) => {
  if (msg.author === discClient.user) { return -1; }

  if (msg.isMentioned(discClient.user)) {
    msg.reply(msg.content);
  }

  if (msg.content.startsWith(prefix)) {
    parseCommand(msg);
  }

  return -1;
});

discClient.login(token);
