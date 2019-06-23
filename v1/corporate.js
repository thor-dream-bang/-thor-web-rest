// api/v1/corporate.js
module.exports = function (fastify, opts, next) {
    fastify.get('/corporate', async (request, reply) => {
        return { hello: 'corporate v1' }
      })
    next()
  }