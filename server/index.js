
const express=require("express")
const {app,server}=require("./src/lib/socket")
const cors=require("cors");
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true 
}))
const port =8000;
server.listen(port,()=>console.log("server are listening"))