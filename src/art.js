import { Tmdb } from 'tmdb';
import config from 'config';

const client = new Tmdb(config.tmdb.apiKey);

export default {
  getMovie(name, year) {
    return client.get('search/movie', { query: name, year })
      .then((result) => {
        if (!result.results.length){
          throw new Error(`No Movie by: ${ name } (${year})`);
        }
        return result.results[0];
      })
      .then((movie) => {
        return client.getMoviePosterImages(movie.id);
      })
      .then((posters) => {
        if (posters.length) {
          return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${posters[0].filePath}`;
        }
      }).catch((err) => {
        console.error(err);
        return '';
      });
  },
  getTv(name, year) {
    return client.get('search/tv', { query: name, year })
      .then((result) => {
        if (!result.results.length){
          throw new Error(`No TV show by: ${name} (${year})`);
        }
        return result.results[0];
      })
      .then((tv) => {
        return client.get(`tv/${tv.id}/images`);
      })
      .then((images) => {
        if (images.posters.length) {
          return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${images.posters[0].filePath}`;
        }
      })
      .catch((err) => {
        console.error(err);

        return '';
      });
  }
};
