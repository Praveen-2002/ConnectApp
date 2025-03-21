export default class User{
    name;
    socket_id;
    room_name;
    User(name,socket_id,room_name){
        this.name = name;
        this.socket_id = socket_id;
        this.room_name = room_name;
    }
}