import config from 'config';
import { Server } from 'hapi';
import registerPlugins from './plugins';

let server = new Server();

server.connection({
  port: config.server.port,
  host: config.server.host
});

registerPlugins(server)
  .then(() => server.initialize())
  .then(() => {
    if (process.env.NODE_ENV !== 'test' || !module.parent) { // checks to see if file is being required
      return server.start()
        .then(() => server);
    }

    return server;
  })
  .catch(console.error);
