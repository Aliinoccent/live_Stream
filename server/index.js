
const express=require("express")
const {app,server}=require("./src/lib/socket")
app.use(express.json());
const port =8000;
server.listen(port,()=>console.log("server are listening"))