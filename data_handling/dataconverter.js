const express = require('express');
const app = express();
const fs = require('fs');
const ndjson = require('ndjson'); 
const mongodb=require('mongodb')

const mongoURI = 'mongodb+srv://shumsd145:shubhamsh@cluster0-zsxx7.mongodb.net/test?retryWrites=true&w=majority';

app.get('/', (req, res) => {
    let readStream = fs.createReadStream('converted_data.json').pipe(ndjson.parse());
    
    const chunks = [];
    var inc=0;
    readStream.on('data', (data) => {
        chunks.push(data);
        console.log(inc)
        inc++
    });
    readStream.on('end',()=>{
        
    })
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});