const express=require('express')
const bodyParser=require('body-parser')
const filter=require('./filter')
const cors=require('cors')
const app=express()

app.use(cors())
app.use(bodyParser.json());

app.post('/',(req,res)=>{
    let obj={}
    if(req.body.filters){
        req.body.filters.map(data=>{
            let op=''
            if(data.operator==='equals'){
                op={
                    $eq:data.value
                }
            }
            else if(data.operator==='greater_than'){
                op={
                    $gt:data.value
                }
            }
            else if(data.operator==='smaller_than'){
                op={
                    $lt:data.value
                }
            }
            else if(data.operator==='between'){
                if(data.key==='created_at'){
                    op={
                        $gte:new Date(data.value[0]),
                        $lte:new Date(data.value[1])
                    }
                }
                else{
                    op={
                        $gte:data.value[0],
                        $lte:data.value[1]
                    }
                }
            }
            else if(data.operator==='contains'){
                op={
                    $regex:data.value.toLowerCase()
                }
            }
            else{
                op=data.value
            }
            obj[data.key]=op
        })
        console.log(obj)
    }
    filter.filtering(obj,res,req.body.page)
}) 


const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})