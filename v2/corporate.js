// api/v2/corporate.js
module.exports = function (fastify, opts, next) {
    fastify.get('/corporate', async (request, reply) => {
        return { hello: 'corporate v2' }
      })
    next()
  }