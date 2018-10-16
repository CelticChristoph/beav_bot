// ----- Requires -------------------------------------------------------------
// Shared
const fs = require('fs');

// Web server
const express = require('express');

const app = express();


// Discord bot
const disc = require('discord.js');

const client = new disc.Client();


// ----- Info -----------------------------------------------------------------
// Server
const port = process.env.PORT || 8080;

// Bot
const { token, ownerID } = JSON.parse(fs.readFileSync('./secret/config.json'));
console.log(`Using Discord bot API token: ${token}`);
console.log(`OwnerID is set as: ${ownerID}`);

// ----- Web-server -----------------------------------------------------------

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}`));

// ----- Bot ------------------------------------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
