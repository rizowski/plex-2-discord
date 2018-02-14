import config from 'config';
import get from 'lodash.get';
import boom from 'boom';
import ass from '../assembler';

export default {
  method: 'POST',
  path: config.server.notifyUrl,
  config: {
    description: 'The notification url for plex service to call',
  },
  handler(request, reply) {
    const payload = get(request, 'payload.payload');
    if (!payload) throw new boom.BadRequest();
    const image = get(request, 'payload.thumb');

    const body = JSON.parse(payload.toString());

    return ass.process(body, image)
      .then(() => {
        reply().code(202);
      }).catch(console.error);
  }
};
