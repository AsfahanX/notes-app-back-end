/**
* @type {import('@hapi/hapi').Plugin<any> |
*  import('@hapi/hapi').ServerRegisterPluginObject<any>
* }
*/
exports.plugin = {
  pkg: require('../../package.json'),
  register: async function(server, options) {
    // Create a route for example

    server.route({
      method: 'GET',
      path: '/test',
      handler: function(request, h) {
        return 'hello, world';
      },
    });

    // etc ...
    await someAsyncMethods();
  },
};
