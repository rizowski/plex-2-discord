import discord from './discord';
import art from './art';

function getBaseData(body) {
  return {
    userImage: body.Account.thumb,
    username: body.Account.title,

    player: body.Player,

    art: body.Metadata.art,
    summary: body.Metadata.summary,
    type: body.Metadata.type,
    rating: body.rating && body.rating / 2,
    year: body.Metadata.year,
  };
}

function getMovieData(body) {
  return Object.assign(
    getBaseData(body),
    { title: body.Metadata.title }
  );
}

function getTvData(body) {
  return Object.assign(
    getBaseData(body),
    { title: body.Metadata.grandparentTitle, secondTitle: body.Metadata.title }
  );
}

function getData(body) {
  if (body.Metadata.type === 'movie') {
    return getMovieData(body);
  } else if (body.Metadata.type === 'episode') {
    return getTvData(body);
  }

  return getBaseData(body);
}

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

    const data = getData(body);
    const fetchImage = sourceMap[data.type];

    return fetchImage(data.title, data.year)
      .then((url) => {
        const payload = formatEvent(data);

        payload.url = url;

        return discord.sendEmbeded(payload);
      });
  }
};
