import { Tmdb } from 'tmdb';
import config from 'config';
import get from 'lodash.get';

const client = new Tmdb(config.tmdb.apiKey);

function getMovieImageUrl(posters){
  if (posters.length) {
    const path = get(posters, '[0].filePath');

    return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${ path }`;
  }
}

function getTvImageUrl(images) {
  if (images.posters.length) {
    const path = get(images, 'posters[0].filePath');

    return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${ path }`;
  }
}

function getQueryResults(type){
  return (result) => {
    if (!result.results.length){
      throw new Error(`No ${type} by: ${ name } (${year})`);
    }

    return result.results[0];
  }
}
function handleError(err) {
  console.error(err);

  return;
}

export default {
  getMovie(name, year) {
    return client.get('search/movie', { query: name, year })
      .then(getQueryResults('movie'))
      .then((movie) => client.getMoviePosterImages(movie.id))
      .then(getMovieImageUrl)
      .catch(handleError);
  },
  getTv(name, year) {
    return client.get('search/tv', { query: name, year })
      .then(getQueryResults('tv'))
      .then((tv) => client.get(`tv/${tv.id}/images`))
      .then(getTvImageUrl)
      .catch(handleError);
  }
};
