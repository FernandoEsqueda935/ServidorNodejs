const TelegramBot = require('node-telegram-bot-api');

const token = '8019580999:AAG_WOeFJ-q_Qvl3gWyzvjy-6CHWwaQXauM';

const bot = new TelegramBot(token, { polling: false });

const chatId = 7832417074; 

const enviarNotificacionIoT = (mensaje) => {
  bot.sendMessage(chatId, mensaje)
    .then(() => console.log('Mensaje enviado'))
    .catch(err => console.error('Error al enviar mensaje:', err));
}

module.exports = {
  enviarNotificacionIoT
};
