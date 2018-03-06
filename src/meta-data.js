import get from 'lodash.get';

function getBaseData(body) {
  return {
    userImage: get(body,'Account.thumb'),
    username: get(body, 'Account.title'),

    player: body.Player,

    art: get(body, 'Metadata.art'),
    summary: get(body, 'Metadata.summary'),
    type: get(body, 'Metadata.type'),
    rating: get(body, 'rating', 0) / 2,
    year: get(body, 'Metadata.year'),
  };
}

function getMovieData(body) {
  return Object.assign(
    getBaseData(body),
    { title: get(body, 'Metadata.title') }
  );
}

function getTvData(body) {
  return Object.assign(
    getBaseData(body),
    { title: get(body, 'Metadata.grandparentTitle'), secondTitle: get(body, 'Metadata.title') }
  );
}

export function getMetaData(body) {
  if (body.Metadata.type === 'movie') {
    return getMovieData(body);
  } else if (body.Metadata.type === 'episode') {
    return getTvData(body);
  }

  return getBaseData(body);
}
