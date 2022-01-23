import http from 'http'
import {Server} from "socket.io"
import {Handshake } from 'socket.io/dist/socket'
import {Orders} from './OrdersService'

let io : Server

function AuthoriseConnection(handshake : Handshake){
    return handshake.query.username === "idir"
}

export default function createSocket(server : http.Server){
    io = new Server(server , {
        cors : {
            origin :['http://localhost:3000'],
            allowedHeaders: ["my-custom-header"],
            
        }
    })

    io.use((socket,next) => {
        if(AuthoriseConnection(socket.handshake)){
            next()
        }
        else{
            next(new Error('invalid'))
        }
    })

    io.on("connection" , (socket : any) => {
        broadCastMessage('onConnectOrders' , Orders)
    })

}

export function broadCastMessage(type : string , message : any){
    if(io.engine.clientsCount > 0){
        io.emit(type,message)
    }
}


