// Require the framework and instantiate it
const fastify = require('fastify')({
	logger: true
})

fastify.register(require('./v1/user'), { prefix: '/v1' })
fastify.register(require('./v1/corporate'), { prefix: '/v1' })

fastify.register(require('./v2/user'), { prefix: '/v2' })
fastify.register(require('./v2/corporate'), { prefix: '/v2' })

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ home: 'welcome REST' })
})

fastify.register(require('fastify-postgres'), {  
  connectionString: 'postgres://kgycouwupiubij:96c1f9e868bc10f9872106e19b18557a2fd10fcc454a46fb7d3003d6617c28aa@ec2-50-19-254-63.compute-1.amazonaws.com:5432/d16jj5dn3fcl5b?ssl=true'
})

fastify.get('/user', async (req, reply) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT * from pengguna;'
  )
  client.release()
  return rows
})

/*
fastify.get('/user', (req, reply) => {
  fastify.pg.connect(onConnect)

  function onConnect (err, client, release) {
    if (err) return reply.send(err)

    client.query(
      'SELECT * from pengguna;',
      function onResult (err, result) {
        release()
        reply.send(err || result)
      }
    )
  }
})
*/


// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000,"::")
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

