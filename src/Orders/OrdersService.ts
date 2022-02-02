
import { Database } from 'firebase-admin/lib/database/database';
import { getCustomerExtras, getCustomerInfos } from '../Database/CustomersDatabase';
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
    return Promise.resolve(
        getCustomerExtras('f21')
        .then((customerExtras)=>{
        return {
            address: customerExtras.Address,
            rating : customerExtras.Rating,
            negativeRating : customerExtras.NegativeRating,
            coordinates : {
                lat : customerExtras.Latitude,
                lng : customerExtras.Longitude
            }
        }
    })
    )
    
    
}

export async function decodeOrder(customerId:string ){
    return Promise.resolve(
        getCustomerExtras(customerId)
        .then((customerExtras)=>{
            return {
                address: customerExtras.Address,
                rating : customerExtras.Rating,
                negativeRating : customerExtras.NegativeRating,
                coordinates : {
                    lat : customerExtras.Latitude,
                    lng : customerExtras.Longitude
                }
            }
        }
    ))
}


