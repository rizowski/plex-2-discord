const config = require('config');
const axios = require('axios');

module.exports= {
  sendEmbeded(data) {
    return axios.post(config.webhookurl, {
      avatar_url: config.bot.avatarUrl,
      username: config.bot.username,

      embeds:[{
        title: data.title,
        description: data.summary,
        thumbnail: {
          url: data.url
        },
        author: {
          icon_url: data.author.icon,
          name: data.author.name,
        }
      }]
    }).catch((err) => {
      console.error(err.response.statusCode, err.response.statusText)
    })
  }
}
