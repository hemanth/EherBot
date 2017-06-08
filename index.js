const TelegramBot = require('node-telegram-bot-api');
const fetch = require('isomorphic-fetch');
const token = process.env.TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
let endPoint = `https://min-api.cryptocompare.com/data/price?fsym=SYM&tsyms=USD,EUR,INR`;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(msg.chat.id,`Try: /price ETH`); 
});

bot.onText(/\/price (.+)/, (msg, match) => {
  fetch(endPoint.replace('SYM', match[1].toUpperCase()))
  .then(resp => resp.json())
  .then(res => {
    bot.sendMessage(msg.chat.id,`$: ${res.USD} | €: ${res.EUR} | ₹: ${res.INR}`); 
  })
  .catch(_ => bot.sendMessage('Error'));
});

