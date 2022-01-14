import http from 'http'
import {Server} from "socket.io"
import {Handshake } from 'socket.io/dist/socket'

class SocketManager{
    #io : Server

    constructor(server : http.Server){
        this.#io = new Server(server , {
            cors : {
                origin :['http://localhost:3000'],
                allowedHeaders: ["my-custom-header"],
                
            }
        })

        this.#io.on("connection" , (socket : any) => {
            console.log("new client")
            if(!this.#AuthoriseConnection(socket.handshake)){
                socket.send('invalid-user' , "Unauthorised Connection")
                socket.disconnect(true)
            }
        })
    }

    BroadCastMessage(type : string , message : any){
        if(this.#io.engine.clientsCount > 0){
            this.#io.emit(type,message)
        }
    }

    #AuthoriseConnection(handshake : Handshake) : boolean{
        return handshake.query.username === "idir"
    }

}

export default SocketManager

