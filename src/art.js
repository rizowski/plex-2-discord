const { Tmdb } = require('tmdb');
const config = require('config');

const client = new Tmdb(config.tmdb.apiKey);

module.exports = {
  getMovie(name, year) {
    return client.get('search/movie', { query: name, year })
      .then((result) => {
        return result.results[0];
      })
      .then((movie) => {
        return client.getMoviePosterImages(movie.id);
      })
      .then((posters) => {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${posters[0].filePath}`;
      });
  },
  getTv(name, year) {
    return client.get('search/tv', { query: name, year })
      .then((result) => {
        return result.results[0];
      })
      .then((tv) => {
        return client.get(`tv/${tv.id}/images`);
      })
      .then((images) => {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${images.posters[0].filePath}`;
      })
  }
}
