const config = require('config');
const { Server } = require('hapi');
const multer = require('multer');

const upload = multer({ dest: './temp' });
const ass = require('./assembler');

let server = new Server();

server.connection({ port: config.server.port, host: 'localhost' });

server.route({
  method: 'POST',
  path: config.server.notifyUrl,
  handler: function (request, reply) {
    const body = JSON.parse(request.payload.payload.toString());
    const image = request.payload.thumb;
    ass.process(body, image);
    reply('OK');
  }
});

module.exports = {
  start() {
    return server.start()
      .then(() => {
        console.log(`Server running at: ${server.info.uri}`);
      })
      .catch(console.error);
  }
}
