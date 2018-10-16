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
const port = 8080;

// Bot
const { token } = JSON.parse(fs.readFileSync('./secret/token.json'));
console.log(`Using Discord bot API token: ${token}`);

// ----- Web-server -----------------------------------------------------------

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}`));

// ----- Bot ------------------------------------------------------------------
client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
