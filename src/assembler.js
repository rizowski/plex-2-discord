
const discord = require('./discord');
const art = require('./art');

function getData(body) {
  console.log(JSON.stringify(body));
  return {
    userImage: body.Account.thumb,
    username: body.Account.title,

    player: body.Player,

    title: body.Metadata.grandparentTitle,
    art: body.Metadata.art,
    summary: body.Metadata.summary,
    type: body.Metadata.type
  };
}

const supportedEvents = {
  'media.play': (body) => {
    if(body.type === 'movie'){
      return ;
    }
    if(body.type === 'episode'){
      return {
        title: `Now Playing ${ body.title}`,
        summary: body.summary,
      };
    }
  },
  'media.scrobble': (body) => {
    return {
      title: 'Ending',
      summary: body.summary,
    };
  },
  'media.rate': (body) => {
    return {
      art: body.art,
      title: 'Rated',
      summary: body.summary,
      description: `${ body.username } just rated ${ body.title } as ...`,
    };
  }
};

module.exports = {
  process(body) {
    const doAction = supportedEvents[body.event];

    if (doAction) {
      const data = getData(body);

      return art.getUrl(data.title)
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
