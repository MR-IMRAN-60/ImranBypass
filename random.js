module.exports.config = {
  name: "random",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "IMRAN",
  description: "sad video",
  category: "admin",
  usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  const res = await axios.get('http://de3.spaceify.eu:25335/video/anime')
    var data = res.data.imgurLink;
    var msg = [];
    let video = `${res.data.data.imgurLink}`;
    let cp = `${res.data.data.title}`
  let ln = `${res.data.count}`

    let videos = (await axios.get(`${video}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/video.mp4", Buffer.from(videos, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/video.mp4"));

    {
        msg += `𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 ${cp}`
    }

    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
}
