import io from 'socket.io-client'

const socket : any = io("http://localhost:3000");

export default socket