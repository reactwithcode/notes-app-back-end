// 1 npm init --y, nodemon --save-dev, npx eslint --init, nanoid
// 2 make http web server

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    // 5c (optional) CORS will be applied to all routes
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // 5a
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
