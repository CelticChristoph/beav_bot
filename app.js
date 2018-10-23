// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

// Discord bot
const disc = require('discord.js');

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
