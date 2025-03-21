import User from "../class/User.js"

let rooms = new Map()

export const addSocketdepency = (io)=>{
    let lobby = []
    let currentRoom = 1

    io.on('connection',(socket)=>{
        console.log("A user has connected")
        socket.on("userName",(name)=>{
            console.log(name)
        })
    
        if (lobby.length<=0){
            lobby.push(socket)
            socket.join("room-"+currentRoom);
        }
        else{
            let firstInQueue = lobby.pop();
            let room_name = "room-"+currentRoom
            let person1 = new User("userName",firstInQueue.id,room_name)
            let person2 = new User("userName",socket.id,room_name)
            socket.join(room_name)
            rooms.set(room_name,[person1,person2])
            currentRoom += 1
            // send user names to each other
            console.log(rooms)
            io.to(room_name).emit("communicate",room_name)
        }
    
        socket.on("sendMessage",(msgAndRoomName)=>{     // [roomName, message]
            socket.to(msgAndRoomName.at(0)).emit("reciveMessage",msgAndRoomName.at(1))
        })
    
        socket.on('disconnect',()=>{
            console.log("User disconnected")
        })

    })
}