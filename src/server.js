const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/HOME',
    handler: (request, h) => {
      const a = request.params;
      return a;
    },
  });
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};


init();
