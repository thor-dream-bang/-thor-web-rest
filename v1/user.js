
let user = require('./controller/user');

module.exports = function (fastify, opts, next) {
  
  fastify.route({
    method: 'GET',
    url: '/user/:id',
    handler: function(request, reply){
      return user.view_user(fastify, request)
    }
  })

  fastify.route({
    method: 'GET',
    url: '/user/:id/hobi',
    handler: function(request, reply){
      return user.view_hoby(fastify, request)
    }
  })

  fastify.route({
    method: 'POST',
    url: '/user/new',
    handler: function(request, reply){
      return user.register(fastify, request)
    }
  })

  next()
}

  