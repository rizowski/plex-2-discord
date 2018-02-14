import blipp from './blipp';
import good from './good';
import router from './hapi-router';

const plugins = [
  blipp,
  router,
  good,
];

export default (server) => {
  return server.register(plugins, { routes: { prefix: '/v1' } });
};
