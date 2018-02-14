export default {
  register: require('hapi-router'),
  options: {
    routes: '../**/routes/*.js',
    cwd: __dirname
  }
};
