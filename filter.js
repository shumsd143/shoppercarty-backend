const mongodb=require('mongodb')
const mongoURI = 'mongodb+srv://todos:shubhamsh@cluster0-vh32b.mongodb.net/test?retryWrites=true&w=majority';

function filtering(body,response,page){
    mongodb.MongoClient.connect(mongoURI,(err,dbclient)=>{
        if(err){
            console.log('connection failed'+err)
            return
        }
        dbclient.db('greendeck').collection('product').find(body)
        .skip(12*(page-1)).limit(12)
        .toArray().then(data=>{
            response.send(data)
            console.log(data.length,page)
        })
    })
}


module.exports.filtering=filtering