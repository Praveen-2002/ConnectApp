import express from 'express'
import {Server} from "socket.io"
import http from  "http"
import { cpuUsage } from 'process';
import {addSocketdepency} from './webSocket/chat.js';

const app = express();

const httpServer = http.createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173"
    }
})

addSocketdepency(io)

app.post("/joinRoom",(req,res)=>{
    let room_name = req.query.room_name
    if(!room_name){
        return res.send({success:false})
    }
    
})


httpServer.listen(3000,()=>{
    console.log("server is running at:",3000);
})