
import { Database } from 'firebase-admin/lib/database/database';
import SocketManager from './SocketManager';
import OrderStatus from './Types';

class OrdersService{
    #firebaseRealTime : Database;
    #socketManager : SocketManager;

    constructor(database : Database , socketManger : SocketManager){
        this.#firebaseRealTime = database;
        this.#ListenToOrdersOnFirebase();
        this.#socketManager = SocketManager.instance
    }

    #ListenToOrdersOnFirebase(){
        const ordersRef =  this.#firebaseRealTime.ref("Orders")
        ordersRef.on("child_added" ,(snapshot) => {
            this.#socketManager.BroadCastMessage("newOrder",snapshot.val())
        })
    }

    UpdateOrderStatus(status : OrderStatus){
        const statusRef = this.#firebaseRealTime.ref("OrdersStatus")
        statusRef.child(status.id).set(status.state)
    }

}

export default OrdersService 