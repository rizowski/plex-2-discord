import { discord } from 'config';
import axios from 'axios';

export default {
  sendEmbeded(data) {
    return axios.post(discord.webhookUrl, {
      'avatar_url': discord.avatarUrl,
      username: discord.username,

      embeds:[{
        title: data.title,
        description: data.summary,
        thumbnail: {
          url: data.url
        },
        author: {
          'icon_url': data.author.icon,
          name: data.author.name,
        }
      }]
    });
  }
};
