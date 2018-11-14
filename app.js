// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

// Discord bot
const disc = require('discord.js');

// Mongo database
const mongo = require('mongodb');

// Assertions
const assert = require('assert');

// Router from ./routes
const routes = require('./routes/index');


// ----- Page Setup -----------------------------------------------------------
const app = express();
const discClient = new disc.Client();

app.use('/', routes);

module.exports = app;

// ----- Bot Info -------------------------------------------------------------
const { token, ownerID, prefix } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);

// ----- Mongo Init -----------------------------------------------------------
const { MongoClient } = mongo;
const url = 'mongodb://localhost:27017'; // CHANGE
const dbName = 'cludgeBot';
const mdbConfig = {
  useNewUrlParser: true,
};

// Create a new MongoClient
const mdbClient = new MongoClient(url, mdbConfig);
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
function parseCommand(msg) {
  const split = msg.content.substr(1).split(' ');
  const command = split[0];

  if (command === 'ping') {
    msg.reply('Pong!');
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
    if (msg.content.toLowerCase === 'hi' || 'hey' || 'hello' || 'yo') {
      msg.reply('Yo.');
    }
  }

  if (msg.content.startsWith(prefix)) {
    parseCommand(msg);
  }

  return -1;
});

discClient.login(token);
