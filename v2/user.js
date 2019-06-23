// api/v2/users.js
module.exports = function (fastify, opts, next) {
    fastify.get('/user', async (request, reply) => {
        return { hello: 'user v2' }
      })
    next()
  }