const express =require('express');
const app=express();
const {Server}=require("socket.io");
const http = require("http");
const server =http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true 
    }
})
io.on('connection',(soket)=>{
    io.emit("connected",soket.id);
})

module.exports={app,server};