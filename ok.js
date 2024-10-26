const axios = require('axios');

module.exports = {
  config: {
    name: "ok",
    version: "6.9.0",
    credits: "dipto",
    cooldowns: 0,
    hasPermission: 0,
    description: "better than all sim simi",
    commandCategory: "chat",
    usePrefix: false,
    prefix: false,
    usages: `[anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR\nall OR\nedit [YourMessage] - [NewMessage]`,
  },

  handleReply: async function ({ api, event, handleReply }) {
    try {
      const response = await axios.get(`https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.reply;

      api.sendMessage(result, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);
    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  run: async function ({ api, event, args, Users }) {
    try {
      const msg = args.join(" ");
      if (!msg) {
        const tl = ["Hum Baby Bolo🐱","Hum bolo🐱","Hum Baby Bolo😔"];
        const name = await Users.getNameUser(event.senderID);
        const rand = tl[Math.floor(Math.random() * tl.length)];
        return api.sendMessage({ 
          body: `${name}, ${rand}`, 
          mentions: [{ tag: name, id: event.senderID }] 
        }, event.threadID, (error, info) => {
          if (error) {
            return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
          }
          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            head: msg,
          });
        }, event.messageID);
      }

      const response = await axios.get(`https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(msg)}`);
      console.log(response.data);
      const replyMessage = response.data.reply;

      api.sendMessage({ body: replyMessage }, event.threadID, (error, info) => {
        if (error) {
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: msg,
        });
      }, event.messageID);
    } catch (error) {
      console.error('Error in run:', error);
      api.sendMessage('An error has occurred, please try again later.', event.threadID, event.messageID);
    }
  }
};
