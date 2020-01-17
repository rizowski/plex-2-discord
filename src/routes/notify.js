import config from 'config';
import get from 'lodash.get';
import boom from 'boom';
import joi from 'joi';
import ass from '../assembler';

export default {
  method: 'POST',
  path: config.get('server.notifyUrl'),
  config: {
    description: 'The notification url for plex service to call',
    validate: {
      payload: joi.object({
        payload: joi.binary().required()
      }).required(),
    }
  },
  handler(request, reply) {
    const payload = get(request, 'payload.payload');
    if (!payload) throw new boom.BadRequest();

    // const image = get(request, 'payload.thumb');
    const body = JSON.parse(payload.toString('utf8'));

    return ass.process(body)
      .then(() => {
        reply().code(202);
      })
      .catch((e) => {
        console.error(e);
        reply().code(202);
      });
  }
};
