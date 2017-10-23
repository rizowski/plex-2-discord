const config = require('config');
const axios = require('axios');

module.exports= {
  sendEmbeded(data) {
    return axios.post(config.webhookurl, {
      embeds:[{
        title: data.title,
        description: data.summary,
        thumbnail: {
          url: data.url
        }
      }]
    }).catch((err) => {
      console.error(err.response.statusCode, err.response.statusText)
    })
  }
}
