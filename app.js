// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

// Body-parser to handle incoming POST requests
// const bodyParser = require('body-parser');

// Next.js
const next = require('next');

// Discord bot
const { Client, RichEmbed } = require('discord.js');

// Mongo database
const mongo = require('mongodb');

// Assertions
const assert = require('assert');

// For URL fetching ES6 style.
const fetch = require('node-fetch');

// Router from ./pages
// const pages = require('./pages/index');
// OLD?

// ----- Page Setup -----------------------------------------------------------
const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, quiet: true });
const handle = nextApp.getRequestHandler();

const discClient = new Client();

nextApp.prepare()
  .then(() => {
    const server = express();

    server.post('/register', (req, res) => {
      console.log(req);
      return { res };
    });
    server.get('/r/:id', (req, res) => {
      const actualPage = '/register';
      const queryParams = { uuid: req.params.id };
      // console.log(queryParams);
      nextApp.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Web-server ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// ----- Bot Info -------------------------------------------------------------
const { token, ownerID, prefix } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);
console.log(`Current bot prefix is: ${prefix}`);

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
function findUser(uuid) {
  const query = { uuid };
  mdb.collection('users').find(query).toArray((err, result) => {
    if (err) throw err;
    console.log(`${result.length} `);
    console.log(result);
  });
}

function addUser(uuid, first, last, onid, field, status) {
  mdb.collection('users').insertOne({
    uuid, first, last, onid, field, status,
  }, (err, r) => {
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

function sendRegistration(msg) {
  console.log(msg.author.id);

  msg.author.createDM()
    .then(dmChan => dmChan.send(`Hey there! Thanks for your interest in OSU EECS Discord channel.\n
    To register for the server, please visit http://71.193.188.235:8080/r/${msg.author.id} \n
    We look forward to chatting with you!`))
    .then(test => console.log(test))
    .catch(console.error);
}

async function parseCommand(msg) {
  const split = msg.content.substr(1).split(' ');
  const command = split[0];

  if (command === 'ping') {
    msg.reply('Pong!');
  }

  if (command === 'register') {
    sendRegistration(msg);
  }

  if (command === 'find') {
    if (msg.author.id !== ownerID) {
      console.log('Bad access!');
      return;
    }
    findUser(split[1]);
  }

  if (command === 'demoRegister') {
    if (msg.author.id !== ownerID) {
      console.log('Bad access!');
      return;
    }
    split.shift();
    console.log(msg.author.id);
    console.log(split[0]);
    console.log(split[1]);
    console.log(split[2]);
    console.log(split[3]);
    console.log(split[4]);

    addUser(msg.author.id, split[0], split[1], split[2], split[3], split[4]);
  }

  if (command === 'xkcd') {
    let message = 'Placeholder message.';
    if (split[1] === undefined) {
      message = await embedXKCD('0');
    } else if (split[1] === 'r') {
      message = await embedXKCD('-1');
    } else if (Number.isInteger(+split[1])) {
      message = await embedXKCD(split[1]);
    } else {
      message = 'Bad format. Usage is `!xkcd [num][r]` where `num` is an integer, and `r` is random.';
    }
    msg.channel.send(message);
  }

  if (command === 'add') {
    addUser();
  }
}

discClient.on('message', (msg) => {
  const message = msg.content.toLowerCase();
  if (msg.author === discClient.user) { return -1; }

  if (msg.isMentioned(discClient.user)) {
    if (message.includes('hello') || message.includes('hi')
      || message.includes('yo') || message.includes('hey')) {
      msg.reply('Hey.');
    }
  }

  if (msg.content.startsWith(prefix)) {
    parseCommand(msg);
  }

  return -1;
});

discClient.on('ready', () => {
  console.log(`Logged in as ${discClient.user.tag}!`);
});

// discClient.login(token);
