const mongodb=require('mongodb')
const mongoURI = 'mongodb+srv://todos:shubhamsh@cluster0-vh32b.mongodb.net/test?retryWrites=true&w=majority';

function filtering(body,response,page){
    mongodb.MongoClient.connect(mongoURI,(err,dbclient)=>{
        if(err){
            console.log('connection failed')
            response.status(503)
            response.send('connection failed with db')
            return
        }
        dbclient.db('greendeck').collection('product').find(body)
        .skip(12*(page-1)).limit(12)
        .toArray().then(data=>{
            response.status(200)
            response.send(data)
            console.log(data.length,page)
        })
        .catch(err=>{
            response.status(400)
            response.send('bad request')
        })
    })
}


module.exports.filtering=filtering