const express =require('express');
const app=express();
const {Server}=require("socket.io");
const http = require("http");
const server =http.createServer(app);
const { v4: uuidv4 } = require('uuid');
const {createClient}=require('redis')

const client = createClient({
    socket:{
        host:"127.0.0.1",
        port : 6379
    }
});
client.connect().then(()=>console.log("connect")).catch(error=>console.log(error));

const messegeArray=[];
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true 
    }
})
io.on('connection',(socket)=>{
    console.log("connected",socket.id)

    socket.on("sendMsg", async(MessageFromClint)=>{
        try{
        messegeArray.push(MessageFromClint);
        const strMessege=JSON.stringify(messegeArray);
       await  client.set("dataMsg",strMessege);
            const data= await client.get("dataMsg")
           const parseData=JSON.parse(data);
            if(parseData){
             console.log("messege from clint :",parseData) 
             io.emit("reciver",parseData); 
            socket.broadcast.emit("reciver",parseData);
            }
    //    return socket.broadcast.emit("reciver",MessageFromClint);
        }
        catch(error){
            console.log(error);
        }
    })
})

module.exports={app,server};