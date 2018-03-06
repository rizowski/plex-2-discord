import config from 'config';
import { Server } from 'hapi';
import registerPlugins from './plugins';

const server = new Server();
const port = config.get('server.port');
const host = config.get('server.host');

server.connection({ host, port });

export default registerPlugins(server)
  .then(() => server.initialize())
  .then(() => {
    if (process.env.NODE_ENV !== 'test' || !module.parent) { // checks to see if file is being required
      return server.start()
        .then(() => server);
    }

    return server;
  })
  .catch(console.error);
