
import { Database } from 'firebase-admin/lib/database/database';
import {broadCastMessage} from './SocketManager';
import OrderStatus, { Order } from './Types';

let firebaseRealTime : Database

async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        if(snapshot.key !== null){
            const orderSnapshot = snapshot.val()
            orderFormater(snapshot.key! , orderSnapshot , (order:Order)=>{
                broadCastMessage("newOrder",order)
            })
        }
    })
}

export async function onFirstConnectionOrders(callback:(orders:any)=>void) {
    const ordersRef =  firebaseRealTime.ref("Orders")

    let id :any
    let childrenCount : number
    let value :any

    ordersRef.once("value",(snapshot) =>{
        if(snapshot.exists()){
            childrenCount = snapshot.numChildren()
            snapshot.forEach((childSnapshot) => {
                id = childSnapshot.key
                value = childSnapshot.val()
                orderFormater(id,value,callback)    
            })
        }
    })
                
}

async function orderFormater(key : string ,orderSnapshot : any , onSuccess:(order:Order)=>void ) {
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(key).once("value", (statusSnapshot) => {
        onSuccess( {
            id :key,
            customerName : orderSnapshot.fullName,
            phoneNumber : orderSnapshot.phoneNumber,
            email : orderSnapshot.email,
            banStatus : false,
            state : statusSnapshot.val().status,
            latitude : orderSnapshot.latitude,
            longitude : orderSnapshot.longitude,
            address : orderSnapshot.address,
            items : orderSnapshot.items,
            time: orderSnapshot.time,
        })
    })
    

    
}

export async function updateOrderStatus(order : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(order.id).set({status : order.status})
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    firebaseRealTime.ref()
    listenToOrdersOnFirebase()
}

