const art = require('movie-art');

module.exports = {
  getUrl(name, year){
    return new Promise((resolve, reject) => {
      art(name, (err, url) => {
        if(err) return reject(err);
        return resolve(url);
      });
    })
  }
}
