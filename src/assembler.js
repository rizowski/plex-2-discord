
const discord = require('./discord');
const art = require('./art');

function getData(body) {
  console.log(JSON.stringify(body));
  return {
    userImage: body.Account.thumb,
    username: body.Account.title,

    player: body.Player,

    title: body.Metadata.grandparentTitle || body.Metadata.title,
    secondTitle: body.Metadata.title,
    art: body.Metadata.art,
    summary: body.Metadata.summary,
    type: body.Metadata.type,
    rating: body.rating && body.rating / 2,
  };
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
        title: `Now Playing ${ body.title } ${ body.secondTitle }`,
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
    return {
      title: `Rated ${ body.title } ${ body.secondTitle } ${ body.rating } stars.`,
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

module.exports = {
  process(body) {
    const doAction = supportedEvents[body.event];

    if (doAction) {
      const data = getData(body);
      const fetchImage = sourceMap[data.type];

      return fetchImage(data.title)
        .then((url) => {
          const payload = doAction(data);

          payload.url = url;

          if (payload) {
            return discord.sendEmbeded(payload);
          }
        });
    }
  }
};
