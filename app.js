// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

// Discord bot
const disc = require('discord.js');

// Mongo database
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient();

// Router from ./routes
const routes = require('./routes/index');

// ----- Setup ----------------------------------------------------------------
const app = express();
const client = new disc.Client();

app.use('/', routes);

module.exports = app;

// ----- Bot Info -------------------------------------------------------------
const { token, ownerID } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);

// ----- Mongo Init -----------------------------------------------------------
const url = 'mongodb://localhost:27017/mydb'; // CHANGE

console.log(typeof mongo); // DEBUG/TESTING

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

// ----- Bot ------------------------------------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// client.login(token);
