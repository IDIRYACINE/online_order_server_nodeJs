
import { Database } from 'firebase-admin/lib/database/database';
import {broadCastMessage} from './SocketManager';
import OrderStatus from './Types';

let firebaseRealTime : Database


async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        broadCastMessage("newOrder",snapshot.val())
    })

    const ordersSnapshot : Map<string,any> =  (await ordersRef.get()).val()
    ordersSnapshot.forEach((value,key) =>{
        Orders.push(value)
    })
}

export function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    listenToOrdersOnFirebase()
}

export let Orders : any  = []


