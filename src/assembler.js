import discord from './discord';
import art from './art';
import { getMetaData } from './meta-data';

const supportedEvents = {
  'media.play': (body) => {
    if(body.type === 'movie'){
      return {
        title: `Now playing ${ body.title }`,
        summary: body.summary,
        author: {
          name: body.username,
          icon: body.userImage,
        },
      };
    }
    if(body.type === 'episode'){
      return {
        title: `Now Playing ${ body.title }:${ body.secondTitle }`,
        summary: body.summary,
        author: {
          name: body.username,
          icon: body.userImage,
        },
      };
    }
  },
  // 'media.scrobble': (body) => {
  //   return {
  //     title: 'Ending',
  //     summary: body.summary,
  //   };
  // },
  'media.rate': (body) => {
    const titles = [body.title, body.secondTitle];

    return {
      title: `Rated "${ titles.join(' ') }" ${ body.rating } stars.`,
      summary: body.summary,
      author: {
        name: body.username,
        icon: body.userImage
      }
    };
  }
};

const sourceMap = {
  movie: art.getMovie,
  episode: art.getTv,
};

export default {
  process(body) {
    const formatEvent = supportedEvents[body.event];

    if(!formatEvent) {
      return Promise.resolve();
    }

    const data = getMetaData(body);
    const fetchImage = sourceMap[data.type];

    return fetchImage(data.title, data.year)
      .then((url) => {
        const payload = formatEvent(data);

        payload.url = url;

        return discord.sendEmbeded(payload);
      });
  }
};
