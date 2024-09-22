const axios = require('axios');
const path = require('path');
const { imgur } = require('imgur-upload-api');

module.exports.config = {
  name: "add",
  version: "1.0.0",
  permission: 0,
  credits: "IMRAN",
  description: "Uploads a video and adds it to an album.",
  prefix: true,
  category: "user",
  usages: "Link",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  if (!args[0]) {
    return api.sendMessage("Please provide a valid URL.", event.threadID, event.messageID);
  }

  const inputUrl = event?.messageReply?.attachments[0].url || args[0];

  try {
    
const uploadResult = await imgur(inputUrl);
          const imgurLink = uploadResult.data.link;

    const fileExtension = path.extname(imgurLink).toLowerCase(); 

    if (fileExtension !== ".mp4") {
      return api.sendMessage("Invalid file format. Only MP4 videos are allowed.", event.threadID, event.messageID);
    }

    const title = args.join(" ") || " uploaded video";

    const svRes = await axios.get(`http://de3.spaceify.eu:25335/album?title=${encodeURIComponent(title)}&url=${encodeURIComponent(imgurLink)}`);
    const data = svRes.data;

    if (data) {
      api.sendMessage(
        `✅ | ${data.data.title}\n\n🔰\n🔥 | URL: ${imgurLink}`,
        event.threadID,
        event.messageID
      );
    } else {
      api.sendMessage("Failed to retrieve album data.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage(
      `Failed to convert media.\nError: ${error.message}`,
      event.threadID,
      event.messageID
    );
  }
};

