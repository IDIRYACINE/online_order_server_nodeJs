import http from 'http'
import WebSocket, { WebSocketServer } from 'ws';

class Subscriber{
    #serverWebSocket
    #connection

    constructor(){
        this.#InitWebSocketServer()
    }

    #InitWebSocketServer(){
        this.#serverWebSocket = new WebSocket.Server({port : 8080})

        this.#serverWebSocket.on('connection' , (socket) => {
            if(!this.#OriginIsAllowed(socket.origin)){
                socket.refuste
            }
        })
        
    }

    #OriginIsAllowed(origin) : boolean{
        return true
    }
}