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


// ----- Setup ----------------------------------------------------------------
const app = express();
const discClient = new disc.Client();

app.use('/', routes);

module.exports = app;

// ----- Bot Info -------------------------------------------------------------
const { token, ownerID } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);

// ----- Mongo Init -----------------------------------------------------------
const { MongoClient } = mongo;
const url = 'mongodb://localhost:27017'; // CHANGE
const dbName = 'cludgeBot';

// Create a new MongoClient
const mdbClient = new MongoClient(url);
let mdb = null;

// Use connect method to connect to the Server
mdbClient.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to MongoDB server');

  mdb = mdbClient.db(dbName);

  // Call using a 'shutdown' function?
  // mdbClient.close();
});

// ----- Bot ------------------------------------------------------------------
discClient.on('ready', () => {
  console.log(`Logged in as ${discClient.user.tag}!`);
});

discClient.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

discClient.on('message', (msg) => {
  if (msg.content === 'add user') {
    mdb.collection('users').insertOne({ a: 1 }, (err, r) => {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
    });
  }
});

// discClient.login(token);
