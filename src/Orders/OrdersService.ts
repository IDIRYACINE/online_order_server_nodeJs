
import { Database } from 'firebase-admin/lib/database/database';
import {broadCastMessage} from './SocketManager';
import OrderStatus from './Types';

let firebaseRealTime : Database

function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        broadCastMessage("newOrder",snapshot.val())
    })
}

export function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    listenToOrdersOnFirebase()
}

