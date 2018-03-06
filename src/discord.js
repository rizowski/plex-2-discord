import { discord } from 'config';
import axios from 'axios';

export default {
  sendEmbeded(data) {
    const embed = {
      title: data.title,
      description: data.summary,
      thumbnail: {
        url: data.url
      },
      author: {
        'icon_url': data.author.icon,
        name: data.author.name,
      }
    };

    return axios.post(discord.webhookUrl, {
      'avatar_url': discord.avatarUrl,
      username: discord.username,

      embeds: [ embed ]
    });
  }
};
