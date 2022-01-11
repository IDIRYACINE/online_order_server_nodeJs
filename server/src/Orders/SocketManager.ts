import http from 'http'
import { Server } from "socket.io"
import { Handshake } from 'socket.io/dist/socket'

class SocketManager{
    static #instance : SocketManager
    #io : Server

    private constructor(server : http.Server){
        this.#io = new Server(server)
        this.#io.on("connection" , (socket) => {
            if(!this.#AuthoriseConnection(socket.handshake)){
                socket.send('error' , "Unauthorised Connection")
                socket.disconnect(true)
            }
        })
        
    }

    BroadCastMessage(type : string , message : any){
        this.#io.emit(type,message)
    }

    #AuthoriseConnection(key : Handshake) : boolean{
        return true
    }


    static get instance(){
        return SocketManager.#instance
    }

    static createInstance(server : http.Server){
        if(SocketManager.#instance === null){
            SocketManager.#instance = new SocketManager(server)
        }
    }   

}

export default SocketManager