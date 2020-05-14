const express = require('express');
const app = express();
const fs = require('fs');
const ndjson = require('ndjson'); 
const mongodb=require('mongodb')

const mongoURI = 'mongodb+srv://shumsd145:shubhamsh@cluster0-zsxx7.mongodb.net/test?retryWrites=true&w=majority';

app.get('/postdata', (req, res) => {
    let readStream = fs.createReadStream('converted_data.json').pipe(ndjson.parse());
    readStream.on('data', (data) => {
        mongodb.MongoClient.connect(mongoURI,(err,dbclient)=>{
          if(err){
              console.log('connection failed')
              res.status(503)
              res.send('connection failed with db')
              return
          }
          dbclient.db('greendeck').collection('product').insert(data,(err,response)=>{
            if(err){
              console.log('post failed',error)
              res.status(400)
              res.send('error while inserting')
              return
            }
            res.send('success')
          })
      })
    })
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});