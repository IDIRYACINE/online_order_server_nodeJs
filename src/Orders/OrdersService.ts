
import { Database } from 'firebase-admin/lib/database/database';
import { getCustomerInfos } from '../Database/CustomersDatabase';
import {broadCastMessage} from './SocketManager';
import OrderStatus from './Types';

let firebaseRealTime : Database


async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        const orderSnapshot = snapshot.val()

        getCustomerInfos(orderSnapshot.id)
        .then(infos=>{
            broadCastMessage("newOrder",{
                id : orderSnapshot.id,
                customerName : infos.FullName,
                phoneNumber : infos.PhoneNumber,
                email : infos.Email,
                banStatus : infos.BanStatus,
                items : orderSnapshot.items
            })
        })
    })



 /*   ordersRef.get().then(snapshot =>{
        const ordersSnapshot = snapshot.val()
        if(ordersSnapshot !== null){
            ordersSnapshot.forEach((value: any,key: any) =>{
                Orders.push(value)
            })
        }
    })
   */
}

export function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    firebaseRealTime.ref()
    listenToOrdersOnFirebase()
}

export let Orders : any  = []

export async function test(){
    getCustomerInfos("f21")
    .then(infos=>{
        broadCastMessage("newOrder",{
            id : "f21",
            customerName : infos.FullName,
            phoneNumber : infos.PhoneNumber,
            email : infos.Email,
            banStatus : infos.BanStatus,
            items : []
        })
    })
    
}



