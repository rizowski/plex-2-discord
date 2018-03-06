import { expect } from 'chai';

import initialize from '../../src/server';

describe('integration: POST /plex-notify', () => {
  let server;

  before(() => {
    return initialize
      .then((s) => {
        server = s;
      });
  });

  describe('play', () => {
    let payload;

    before(() => {
      payload = require('../../payloads/movie.play');
    });

    it('calls discord webhook with the appropriate content', () => {
      return server.inject({
        method: 'POST',
        url: '/v1/plex-notify',
        payload: { payload: new Buffer(JSON.stringify(payload)) }
      })
        .then((response) => {
          console.log(response.statusCode);
        });
    });
  });

  describe('stop', () => {

  });

  describe('rate', () => {

  });

  describe('scrobble', () => {

  });
});
