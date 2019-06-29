// api/v1/users.js
module.exports = function (fastify, opts, next) {
  fastify.get('/user/:id', async (req, reply) => {
    const client = await fastify.pg.connect()

    let data = [];
    if ([req.params.id] > 0){
      data = await client.query(
        'SELECT * from pengguna WHERE id=$1;', [req.params.id],
      )
    } else {
      data = await client.query(
        'SELECT * from pengguna;'
      )
    }      
    
    client.release()
    return data.rows
  }),
  fastify.get('/user/:id/hobi', async (req, reply) => {
    const client = await fastify.pg.connect()

    let data = [];
    if ([req.params.id] > 0){
      data = await client.query(
        'SELECT * from hobi WHERE id_pengguna=$1;', [req.params.id],
      )
    } else {
      data = await client.query(
        'SELECT * from hobi;'
      )
    }      
    
    client.release()
    return data.rows
  })
  next()
}

  