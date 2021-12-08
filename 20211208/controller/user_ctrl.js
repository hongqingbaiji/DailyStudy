import db from '../db/index.js'

export async function getAllUser(req,res){
  const [rows] = await db.query('select id,username,nickname from ev_users')
  res.send({
    status:0,
    message:'success',
    data:rows
  })
}

