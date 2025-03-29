const lobby = []
let currentRoom = 1
const UserData = new Map()
const RoomData = new Map()

export const addSocketdepency = (io)=>{

    io.on('connection',(socket)=>{
        console.log("A user has connected")
        lobby.push(socket)
        AddUserToNewRoom(io)

        socket.on("check",()=>{
            let room_name = UserData.get(socket.id)
            let persons_in_room = RoomData.get(room_name)
            console.log("validationstarted :", room_name, persons_in_room)
            if(persons_in_room?.length>1){
                console.log("valid")
                socket.emit("No-waiting",true)
            }
            io.to(room_name).emit("communicate",room_name)
        })

        socket.on("userName",(name)=>{
            console.log(name)
        })
    
        socket.on("sendMessage",(msgAndRoomName)=>{     // [roomName, message]
            console.log(msgAndRoomName)
            socket.to(msgAndRoomName.at(0)).emit("reciveMessage",msgAndRoomName.at(1))
        })
    
        socket.on('disconnect',()=>{
            let id = socket.id
            let roomName = UserData.get(id.toString())
            let leftOutUser = RoomData.get(roomName)?.find(x => x.id != id)
            if (leftOutUser){
                io.to(leftOutUser?.id).emit("userDisconneted","Wait while we find a new connection")
                leftOutUser.leave(roomName)
                lobby.push(leftOutUser)
                AddUserToNewRoom(io)
                console.log("User disconnected")
            }
        })

    })
}


function AddUserToNewRoom(io){
    while (lobby.length > 1){
        let person1 = lobby.pop()
        let person2 = lobby.pop()
        let room_name = "room-"+currentRoom
        person1.join(room_name)
        person2.join(room_name)
        UserData.set(person1.id, room_name)
        UserData.set(person2.id, room_name)
        RoomData.set(room_name,[person1,person2])
        currentRoom += 1
        // io.to(room_name).emit("communicate",room_name)
    }
}
// socket.adapter.rooms // keeps track of all currently rooms that are there in server and there members 