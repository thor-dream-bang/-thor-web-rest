// Require the framework and instantiate it
const fastify = require('fastify')({
	logger: true
})

fastify.register(require('./v1/user'), { prefix: '/v1' })
fastify.register(require('./v1/corporate'), { prefix: '/v1' })

fastify.register(require('./v2/user'), { prefix: '/v2' })
fastify.register(require('./v2/corporate'), { prefix: '/v2' })

// Run the server!
const start = async () => {
  try {
    //await fastify.listen(process.env.PORT || 3000)
    await fastify.listen(process.env.PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

