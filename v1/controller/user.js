let crypto = require('crypto');

async function register (fastify, request) {
    try{
        console.log('request body: ', request.body.nama)

        const client = await fastify.pg.connect()
        let token = crypto.randomBytes(32).toString('hex');

        let data = [];
        data = await client.query(
            'select max(id)+1 id from pengguna;'
        )        
        let lastid = data.rows[0].id;

        let query = "insert into register values(" + lastid + ",'" + token + "'); ";
        query += "insert into pengguna values("+ lastid +",'"+ request.body.nama + "',"+ request.body.usia +",'"+request.body.alamat+"','"+ request.body.skill +"');"
        console.log('query: ', query)
        let resultquery = await client.query(query)

        client.release()

        let result ={
            "id": lastid,
            "nama": request.body.nama,
            "token": token
            //"result_query": resultquery
        }
        return JSON.stringify(result);
    } catch(e){
        console.log('error register: ', e)
        return 'System error, failed register!'
    }
}

async function view_user (fastify, req) {
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
}

async function view_hoby (fastify, req) {
    const client = await fastify.pg.connect()

    let data = [];
    if ([req.params.id] > 0){
      data = await client.query(
        'SELECT b.nama, a.* from hobi a join pengguna b on a.id_pengguna = b.id WHERE id_pengguna=$1;', [req.params.id],
      )
    } else {
      data = await client.query(
        'SELECT b.*, a.hobitext from hobi a join pengguna b on a.id_pengguna = b.id;'
      )
    }      
    
    client.release()
    return data.rows
}

module.exports = {
    register,
    view_user,
    view_hoby
};